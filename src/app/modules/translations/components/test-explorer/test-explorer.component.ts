import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionsService } from '../../../questions/services/questions.service';
import { StudentAnswersService } from '../../../student-answers/services/student-answers.service';
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
		private questionsService: QuestionsService,
		private studentAnswersService: StudentAnswersService
	) {
		this.dataSource = new TestExplorerDataSource(
			this.treeControl,
			questionsService,
			studentAnswersService
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
