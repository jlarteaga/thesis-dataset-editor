import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TestExplorerDataSource, TranslationFlatNode } from './data-source/test-explorer.data-source';

@Component({
	selector: 'app-test-explorer',
	templateUrl: './test-explorer.component.html',
	styleUrls: ['./test-explorer.component.scss']
})
export class TestExplorerComponent implements OnInit, OnDestroy {

	dataSource: TestExplorerDataSource;
	treeControl = new FlatTreeControl<TranslationFlatNode>(
		dataNode => dataNode.level,
		dataNode => dataNode.expandable
	);

	constructor(
		private store: Store
	) {
		this.dataSource = new TestExplorerDataSource(
			this.treeControl,
			store
		);
	};

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
	}

	hasChild(_: number, node: TranslationFlatNode) {
		return node.expandable;
	}

}
