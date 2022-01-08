import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { State } from '../../../../state/reducers';
import { selectTranslationNodes, TranslationNode } from '../../../../state/selectors/translations/translation-tree.selectors';

/** Flat node with expandable and level information */
interface TranslationFlatNode {
	expandable: boolean;
	name: string;
	level: number;
}

@Component({
	selector: 'app-test-explorer',
	templateUrl: './test-explorer.component.html',
	styleUrls: ['./test-explorer.component.scss']
})
export class TestExplorerComponent implements OnInit, OnDestroy {

	treeControl = new FlatTreeControl<TranslationFlatNode>(
		node => node.level,
		node => node.expandable
	);
	translationNodes$: Observable<TranslationNode[]>;
	dataSource = new MatTreeFlatDataSource(this.treeControl, TestExplorerComponent.treeFlattener);
	subscriptions: Subscription[] = [];

	static _transformer = (node: TranslationNode, level: number) => {
		return {
			expandable: !!node.children && node.children.length > 0,
			name: node.name,
			level: level
		};
	};

	static treeFlattener = new MatTreeFlattener(
		TestExplorerComponent._transformer,
		node => node.level,
		node => node.expandable,
		node => node.children
	);

	constructor(
		private store: Store<State>
	) {
		this.translationNodes$ = store.select(selectTranslationNodes);
		this.subscriptions.push(this.translationNodes$.subscribe(translationNodes => {
			this.dataSource.data = translationNodes;
		}));
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	hasChild = (_: number, node: TranslationFlatNode) => node.expandable;

}
