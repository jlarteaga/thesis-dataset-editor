import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { sanitizeText } from '../../../../utils/sanitize';
import { TextStatus } from '../../../student-answers/models/text';
import { TranslationNodesActions } from '../../state/actions';
import { selectFocusedQuestion, selectUpdatingQuestionTranslation } from '../../state/selectors/translation-nodes';
import { QuestionTranslationNode } from '../../state/translations.state';

@Component({
	selector: 'app-translate-question',
	templateUrl: './translate-question.component.html',
	styleUrls: ['./translate-question.component.scss']
})
export class TranslateQuestionComponent implements OnDestroy {

	updatingQuestionTranslation$: Observable<boolean>;
	subscriptions: Subscription[] = [];
	questionNode: QuestionTranslationNode | null = null;
	formGroup: FormGroup;

	constructor(
		private store: Store,
		private formBuilder: FormBuilder
	) {
		this.formGroup = formBuilder.group({
			sentStatement: ['', Validators.required],
			sentAnswer: ['', Validators.required]
		});
		this.subscriptions.push(
			this.store.select(selectFocusedQuestion).subscribe(focusedQuestion => {
				this.questionNode = focusedQuestion || null;
				if (focusedQuestion) {
					this.formGroup.setValue({
						sentStatement: focusedQuestion.element.es?.sentStatement,
						sentAnswer: focusedQuestion.element.es?.answer.sent
					});
				}
			})
		);
		this.updatingQuestionTranslation$ = this.store.select(selectUpdatingQuestionTranslation);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	updateQuestion() {
		if (!this.questionNode?.element.es?.uuid) {
			return;
		}
		this.store.dispatch(TranslationNodesActions.patchQuestion({
			uuid: this.questionNode.element.es.uuid,
			patch: {
				sentStatement: this.formGroup.get('sentStatement')?.value,
				sent: this.formGroup.get('sentAnswer')?.value,
				status: TextStatus.CleanedTranslated
			}
		}));
	}

	sanitizeEntries() {
		['sentStatement', 'sentAnswer'].forEach(key => {
			const sanitizedText = sanitizeText(this.formGroup.get(key)?.value || '');
			this.formGroup.get(key)?.setValue(sanitizedText);
		});
	}
}
