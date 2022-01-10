import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, merge, Observable, Subscription } from 'rxjs';
import { Question } from '../../../../questions/models/question';
import { Text, TextStatus } from '../../../../student-answers/models/text';
import { TranslationNodesActions } from '../../../state/actions';
import { selectTranslationNodes } from '../../../state/selectors/translation-nodes';
import { QuestionTranslationNode, TranslationNode } from '../../../state/translations.state';

export interface TranslationFlatNode {
	id: any;
	expandable: boolean;
	name: string;
	level: number;
	isLoading: boolean;
	isDynamic: boolean;
	status: TextStatus;
	url?: string;
	_origin: TranslationNode;
}

const transformer = (node: TranslationNode, level: number): TranslationFlatNode => {
	const isDynamic = node.type === 'question';
	const expandable = isDynamic || (node.type !== 'student-answer');
	const name = node.type === 'question'
		? `Question ${node.label}`
		: `Answer ${node.index + 1}`;
	return {
		id: node.type === 'question' ? node.label : `${node.questionLabel}/${node.index}`,
		isDynamic,
		expandable,
		name,
		level,
		isLoading: node.type === 'question' && node.isLoading,
		status: (node.type === 'question' ? node.element.es?.answer?.status : node.element.es?.text.status) || TextStatus.Unknown,
		url: node.type === 'question'
			? `/translations/questions/${node.label}`
			: `/translations/questions/${node.questionLabel}/student-answers/${node.index}`,
		_origin: node
	};
};

interface PossibleChange {
	type: 'loadChildren' | 'unloadChildren' | 'updateEsProperties' | 'updateEsAnswerProperties';
	oldNode: QuestionTranslationNode;
	newNode: QuestionTranslationNode;
}

const propertiesAllowedToChangeInEsQuestion: Array<keyof Question> = ['sentStatement'];
const propertiesAllowedToChangeInEsQuestionAnswer: Array<keyof Text> = ['sent', 'status'];
const propertiesAllowedToChangeInFlattenedNode: Array<keyof TranslationFlatNode> = ['status'];

const getPossibleChanges = (previousNodes: QuestionTranslationNode[], newNodes: QuestionTranslationNode[]): PossibleChange[] | null => {
	if (previousNodes.length !== newNodes.length) {
		return null;
	}
	const propertiesToCheck: Array<keyof QuestionTranslationNode> = ['type', 'testNumber', 'questionNumber', 'label'];
	const length = previousNodes.length;

	const changes: PossibleChange[] = [];

	let previousNode: QuestionTranslationNode;
	let newNode: QuestionTranslationNode;
	let propertyToCheck: keyof QuestionTranslationNode;
	for (let i = 0; i < length; i++) {
		previousNode = previousNodes[i];
		newNode = newNodes[i];
		for (let j = 0; j < propertiesToCheck.length; j++) {
			propertyToCheck = propertiesToCheck[j];
			if (previousNode[propertyToCheck] !== newNode[propertyToCheck]) {
				return null;
			}
		}
		if (previousNode.children.length === 0 && newNode.children.length > 0) {
			changes.push({
				type: 'loadChildren',
				oldNode: previousNode,
				newNode: newNode
			});
		} else if (previousNode.children.length > 0 && newNode.children.length === 0) {
			changes.push({
				type: 'unloadChildren',
				oldNode: previousNode,
				newNode: newNode
			});
		}
		let propertyAllowedToChange;
		if (previousNode.element.es && newNode.element.es) {
			for (let j = 0; j < propertiesAllowedToChangeInEsQuestion.length; j++) {
				propertyAllowedToChange = propertiesAllowedToChangeInEsQuestion[j];
				if (previousNode.element.es[propertyAllowedToChange] !== newNode.element.es[propertyAllowedToChange]) {
					changes.push({
						type: 'updateEsProperties',
						oldNode: previousNode,
						newNode
					});
					break;
				}
			}
			for (let j = 0; j < propertiesAllowedToChangeInEsQuestionAnswer.length; j++) {
				propertyAllowedToChange = propertiesAllowedToChangeInEsQuestionAnswer[j];
				if (previousNode.element.es.answer[propertyAllowedToChange] !== newNode.element.es.answer[propertyAllowedToChange]) {
					changes.push({
						type: 'updateEsAnswerProperties',
						oldNode: previousNode,
						newNode
					});
					break;
				}
			}
		}

	}
	return changes;
};

export class TestExplorerDataSource implements DataSource<TranslationFlatNode> {

	private subscriptions: Subscription[] = [];

	private _treeFlattener: MatTreeFlattener<TranslationNode, TranslationFlatNode>;
	private _flattenedData = new BehaviorSubject<TranslationFlatNode[]>([]);
	private _expandedData = new BehaviorSubject<TranslationFlatNode[]>([]);
	private _data = new BehaviorSubject<QuestionTranslationNode[]>([]);

	get data(): QuestionTranslationNode[] {
		return this._data.value;
	}

	set data(value: QuestionTranslationNode[]) {
		const previousValue = this._data.value;
		this._data.next(value);

		const possibleChanges = getPossibleChanges(previousValue, value);
		if (possibleChanges === null) {
			this._flattenedData.next(this._treeFlattener.flattenNodes(this.data));
			this._treeControl.dataNodes = this._flattenedData.value;
		} else if (possibleChanges.length > 0) {
			possibleChanges.forEach(possibleChange => {

				const newFlattenedParent: TranslationFlatNode = this._treeFlattener.flattenNodes([possibleChange.newNode])[0];
				const parentIndex = this._flattenedData.value.findIndex(flattenedNode => flattenedNode.id === newFlattenedParent.id);
				if (parentIndex < 0) {
					return;
				}

				switch (possibleChange.type) {
					case 'loadChildren': {
						const flattenedChildren: TranslationFlatNode[] = this._treeFlattener.flattenNodes(possibleChange.newNode.children);
						const flattenedParent = this._flattenedData.value[parentIndex];
						flattenedParent.isLoading = false;
						flattenedParent._origin = possibleChange.newNode;
						flattenedChildren.forEach(flattenedNode => {
							flattenedNode.level += flattenedParent.level + 1;
						});
						this._flattenedData.value.splice(parentIndex + 1, 0, ...flattenedChildren);
						break;
					}
					case 'unloadChildren':
						this._flattenedData.value.splice(parentIndex + 1, possibleChange.oldNode.children.length);
						this._flattenedData.next(this._flattenedData.value);
						break;
					case 'updateEsAnswerProperties':
					case 'updateEsProperties': {
						const flattenedParent: TranslationFlatNode = this._flattenedData.value[parentIndex];
						propertiesAllowedToChangeInFlattenedNode.forEach(prop => {
							// @ts-ignore
							flattenedParent[prop] = newFlattenedParent[prop];
						});
						this._flattenedData.value.splice(parentIndex, 1, flattenedParent);
						break;
					}
				}
				this._flattenedData.next(this._flattenedData.value);
			});
		}
	}

	constructor(
		private _treeControl: FlatTreeControl<TranslationFlatNode>,
		private store: Store
	) {
		this._treeFlattener = new MatTreeFlattener(
			transformer,
			node => node.level,
			node => node.expandable,
			() => null
		);
		this.subscriptions.push(
			this.store.select(selectTranslationNodes).subscribe(translationNodes => {
				this.data = translationNodes;
			})
		);
	}

	connect(collectionViewer: CollectionViewer): Observable<TranslationFlatNode[]> {
		this.subscriptions.push(
			this._treeControl.expansionModel.changed.subscribe(change => {
				if (
					(change as SelectionChange<TranslationFlatNode>).added ||
					(change as SelectionChange<TranslationFlatNode>).removed
				) {
					this.handleTreeControl(change as SelectionChange<TranslationFlatNode>);
				}
			})
		);
		return merge(collectionViewer.viewChange, this._treeControl.expansionModel.changed, this._flattenedData)
			.pipe(
				map(() => {
					this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this._flattenedData.value, this._treeControl));
					return this._expandedData.value;
				})
			);
	}

	disconnect() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	private handleTreeControl(change: SelectionChange<TranslationFlatNode>): void {
		if (change.added) {
			change.added.forEach(node => this.toggleNode(node, true));
		}
		if (change.removed) {
			change.removed.slice()
				.reverse()
				.forEach(node => this.toggleNode(node, false));
		}
	}

	private toggleNode(node: TranslationFlatNode, expand: boolean) {
		const index = this._flattenedData.value.indexOf(node);
		if (!node.isDynamic || index < 0) {
			return;
		}
		const parentNode = node._origin;
		if (parentNode.type === 'question') {
			if (expand) {
				if (parentNode.children.length > 0) {
					return;
				}
				this.store.dispatch(
					TranslationNodesActions.loadStudentAnswerNodes({
						parentNode
					})
				);
				node.isLoading = true;
			} else {
				this.store.dispatch(
					TranslationNodesActions.unloadStudentAnswerNodes({
						parentNode
					})
				);
			}
		}
	}
}