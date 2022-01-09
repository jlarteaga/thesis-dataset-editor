import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectFocusedQuestion, selectFocusedStudentAnswer } from '../../state/selectors/translation-nodes';
import { QuestionTranslationNode, StudentAnswerTranslationNode } from '../../state/translations.state';

@Component({
	selector: 'app-translate-student-answer',
	templateUrl: './translate-student-answer.component.html',
	styleUrls: ['./translate-student-answer.component.scss']
})
export class TranslateStudentAnswerComponent implements OnDestroy {

	subscriptions: Subscription[] = [];
	questionNode: QuestionTranslationNode | null = null;
	studentAnswerNode: StudentAnswerTranslationNode | null = null;

	constructor(
		private store: Store
	) {
		this.subscriptions.push(
			this.store.select(selectFocusedQuestion).subscribe(focusedQuestion => {
				this.questionNode = focusedQuestion || null;
			})
		);
		this.subscriptions.push(
			this.store.select(selectFocusedStudentAnswer).subscribe(focusedAnswer => {
				this.studentAnswerNode = focusedAnswer || null;
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

}
