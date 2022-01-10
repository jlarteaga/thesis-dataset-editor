import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { sanitizeText } from '../../../../utils/sanitize';
import { TextStatus } from '../../../student-answers/models/text';
import { TranslationNodesActions } from '../../state/actions';
import {
	selectFocusedQuestion,
	selectFocusedStudentAnswer,
	selectUpdatingStudentAnswerTranslation
} from '../../state/selectors/translation-nodes';
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
	updatingStudentAnswerTranslation$: Observable<boolean>;
	formGroup: FormGroup;

	constructor(
		private store: Store,
		private formBuilder: FormBuilder
	) {
		this.formGroup = formBuilder.group({
			sent: ['', Validators.required]
		});

		this.updatingStudentAnswerTranslation$ = this.store.select(selectUpdatingStudentAnswerTranslation);

		this.subscriptions.push(
			this.store.select(selectFocusedQuestion).subscribe(focusedQuestion => {
				this.questionNode = focusedQuestion || null;
			})
		);
		this.subscriptions.push(
			this.store.select(selectFocusedStudentAnswer).subscribe(focusedAnswer => {
				this.studentAnswerNode = focusedAnswer || null;
				this.formGroup.get('sent')?.setValue(this.studentAnswerNode?.element.es?.text.sent || '');
				if (!this.studentAnswerNode && this.questionNode && !this.questionNode.children.length) {
					this.store.dispatch(
						TranslationNodesActions.loadStudentAnswerNodes({
							parentNode: this.questionNode
						})
					);
				}
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	updateStudentAnswer() {
		if (!this.studentAnswerNode?.element.es?.uuid) {
			return;
		}
		this.store.dispatch(TranslationNodesActions.patchStudentAnswer({
			uuid: this.studentAnswerNode.element.es.uuid,
			patch: {
				sent: this.formGroup.get('sent')?.value,
				status: TextStatus.CleanedTranslated
			}
		}));
	}

	sanitizeEntries() {
		['sent'].forEach(key => {
			const sanitizedText = sanitizeText(this.formGroup.get(key)?.value || '');
			this.formGroup.get(key)?.setValue(sanitizedText);
		});
	}

}
