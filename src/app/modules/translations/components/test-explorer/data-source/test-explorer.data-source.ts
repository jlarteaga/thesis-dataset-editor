import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, map, merge, Observable, Subscription, zip } from 'rxjs';
import { SupportedLanguage } from '../../../../../utils/global-types';
import { Question } from '../../../../questions/models/question';
import { QuestionsService } from '../../../../questions/services/questions.service';
import { GetAllStudentAnswerDTO } from '../../../../student-answers/dtos/get-all-student-answer.dto';
import { StudentAnswer } from '../../../../student-answers/models/student-answer';
import { StudentAnswersService } from '../../../../student-answers/services/student-answers.service';

interface TestTranslationNode {
	type: 'test';
	element: number;
	children: QuestionTranslationNode[];
}

interface QuestionTranslationNode {
	type: 'question';
	number: number;
	label: string;
	element: Partial<Record<SupportedLanguage, Question>>;
	children: StudentAnswerTranslationNode[];
}

interface StudentAnswerTranslationNode {
	type: 'student-answer';
	index: number;
	questionLabel: string;
	element: Partial<Record<SupportedLanguage, StudentAnswer>>;
}

type TranslationNode = TestTranslationNode | QuestionTranslationNode | StudentAnswerTranslationNode;

export interface TranslationFlatNode {
	expandable: boolean;
	name: string;
	level: number;
	isLoading: boolean;
	isDynamic: boolean;
	url?: string;
	_origin: TranslationNode;
}

const transformer = (node: TranslationNode, level: number): TranslationFlatNode => {
	const isDynamic = node.type === 'question';
	const expandable = isDynamic ||
		(node.type !== 'student-answer' && !!node.children && node.children.length > 0);
	const name = node.type === 'test'
		? `Test ${node.element}`
		: (
			node.type === 'question'
				? `Question ${node.number}`
				: `Answer ${node.index + 1}`
		);
	return {
		isDynamic,
		expandable,
		name,
		level,
		isLoading: false,
		url: node.type === 'test'
			? undefined
			: (
				node.type === 'question'
					? `/translations/questions/${node.label}`
					: `/translations/questions/${node.questionLabel}/student-answers/${node.index}`
			),
		_origin: node
	};
};

export class TestExplorerDataSource implements DataSource<TranslationFlatNode> {

	private subscriptions: Subscription[] = [];

	private _treeFlattener: MatTreeFlattener<TranslationNode, TranslationFlatNode>;
	private _flattenedData = new BehaviorSubject<TranslationFlatNode[]>([]);
	private _expandedData = new BehaviorSubject<TranslationFlatNode[]>([]);
	private _data = new BehaviorSubject<TranslationNode[]>([]);

	get data(): TranslationNode[] {
		return this._data.value;
	}

	set data(value: TranslationNode[]) {
		this._data.next(value);
		this._flattenedData.next(this._treeFlattener.flattenNodes(this.data));
		this._treeControl.dataNodes = this._flattenedData.value;
	}

	constructor(
		private _treeControl: FlatTreeControl<TranslationFlatNode>,
		private questionsService: QuestionsService,
		private studentAnswersService: StudentAnswersService
	) {
		this._treeFlattener = new MatTreeFlattener(
			transformer,
			node => node.level,
			node => node.expandable,
			node => {
				switch (node.type) {
					case 'test':
						return node.children;
					default:
						return null;
				}
			}
		);
		this.refreshData();
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

	private getStudentAnswersTranslationNodes(label: string, esQuestionUuid: string | undefined, enQuestionUuid: string | undefined): Observable<StudentAnswerTranslationNode[]> {
		return zip(
			this.studentAnswersService.getAllByQuestionUuid(esQuestionUuid),
			this.studentAnswersService.getAllByQuestionUuid(enQuestionUuid)
		).pipe(
			map(([esStudentAnswerDtos, enStudentAnswerDtos]) => [...esStudentAnswerDtos, ...enStudentAnswerDtos]),
			map((studentAnswerDtos: GetAllStudentAnswerDTO[]) => {
				const children: Array<StudentAnswerTranslationNode> = [];
				studentAnswerDtos.forEach(studentAnswerDto => {
					if (!children[studentAnswerDto.student]) {
						children[studentAnswerDto.student] = {
							type: 'student-answer',
							questionLabel: label,
							index: studentAnswerDto.student,
							element: {}
						};
					}
					children[studentAnswerDto.student].element[studentAnswerDto.text.lang] = StudentAnswer.fromDto(studentAnswerDto);
				});
				return children;
			})
		);
	}

	private refreshData() {
		this.questionsService.getAll().pipe(
			map(getAllQuestionDTOs => getAllQuestionDTOs.map(getAllQuestionDTO => Question.fromDto(getAllQuestionDTO))),
			map(questions => {
				const testMap = new Map<number, {
					testNumber: number,
					questions: Map<number, Partial<Record<SupportedLanguage, Question>>>
				}>();
				questions.forEach(question => {
					const [testNumber, questionNumber] = Question.getTestAndQuestionNumber(question.label);
					if (!testMap.has(testNumber)) {
						testMap.set(testNumber, {
							testNumber,
							questions: new Map()
						});
					}
					// @ts-ignore
					const questionsMap = testMap.get(testNumber).questions;
					if (!questionsMap.has(questionNumber)) {
						questionsMap.set(questionNumber, {});
					}
					// @ts-ignore
					questionsMap.get(questionNumber)[question.lang] = question;
				});
				const nodes: TestTranslationNode[] = [];
				testMap.forEach(({ questions, testNumber }) => {
					const node: TestTranslationNode = {
						type: 'test',
						element: testNumber,
						children: []
					};
					questions.forEach((questionPair, questionNumber) => {
						node.children.push({
							type: 'question',
							label: questionPair?.en?.label || questionPair?.es?.label || `${testNumber}.${questionNumber}`,
							number: questionNumber,
							element: questionPair,
							children: []
						});
					});
					node.children.sort((question1, question2) => question1.number - question2.number);
					nodes.push(node);
				});
				nodes.sort((node1, node2) => node1.element - node2.element);
				return nodes;
			})
		).subscribe((nodes: TranslationNode[]) => {
			this.data = nodes;
		});

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
				node.isLoading = true;
				this.getStudentAnswersTranslationNodes(parentNode.label, parentNode.element.es?.uuid, parentNode.element.en?.uuid)
					.subscribe(translationNodes => {
						const [testNumber, questionNumber] = Question.getTestAndQuestionNumber(parentNode.label);
						// @ts-ignore
						const testNode: TestTranslationNode | undefined = this.data.find(node => node.type === 'test' && node.element === testNumber);
						if (testNode) {
							const questionNode = testNode.children.find(node => node.type === 'question' && node.number === questionNumber);
							if (questionNode) {
								questionNode.children = translationNodes;
							}
						}
						const flattenedNodes = this._treeFlattener.flattenNodes(translationNodes);
						flattenedNodes.forEach(flattenedNode => {
							flattenedNode.level += node.level + 1;
						});
						this._flattenedData.value.splice(index + 1, 0, ...flattenedNodes);
						this._flattenedData.next(this._flattenedData.value);
						node.isLoading = false;
					});
			} else {
				this._flattenedData.value.splice(index + 1, parentNode.children.length);
				this._flattenedData.next(this._flattenedData.value);
			}
		}
	}
}