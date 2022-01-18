import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ShownQuestionsActions } from 'src/app/modules/questions/state/actions';
import { ResourceStatus } from '../../../../state/global.state';
import { AvailableTests, ParsedQuestion, ParsedTest, selectAvailableTests } from '../../../questions/state/selectors';
import { StudentAnswer } from '../../models/student-answer';
import { AvailableLanguage } from '../../models/text';
import { ShownStudentAnswersActions } from '../../state/actions';
import { clearShownStudentAnswers } from '../../state/actions/shown-student-answers.actions';
import { selectShownStudentAnswers, selectShownStudentAnswersStatus } from '../../state/selectors';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
	readonly AvailableLanguage = AvailableLanguage;
	readonly ResourceStatus = ResourceStatus;
	availableTests: AvailableTests | null = null;
	shownStudentAnswers: StudentAnswer[] | null = null;
	shownStudentAnswersStatus: ResourceStatus = ResourceStatus.NotLoaded;
	private subscriptions: Subscription[] = [];

	private _lang: AvailableLanguage = AvailableLanguage.Es;

	get lang(): AvailableLanguage {
		return this._lang;
	}

	set lang(value: AvailableLanguage) {
		this._lang = value;
		this.test = null;
	}

	private _question: ParsedQuestion | null = null;

	get question(): ParsedQuestion | null {
		return this._question;
	}

	set question(newParsedQuestion: ParsedQuestion | null) {
		this._question = newParsedQuestion;
		this.store.dispatch(clearShownStudentAnswers());
	}

	private _test: ParsedTest | null = null;

	get test(): ParsedTest | null {
		return this._test;
	}

	set test(value: ParsedTest | null) {
		this._test = value;
		this.question = null;
	}

	constructor(
		private store: Store
	) {
		this.store.dispatch(ShownQuestionsActions.updateShownQuestions());
		this.initializeAvailableTestsSubscription();
		this.initializeShownStudentAnswersSubscriptions();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
		this.store.dispatch(ShownStudentAnswersActions.clearShownStudentAnswers());
	}

	showStudentAnswersForQuestion(questionUuid: string) {
		this.store.dispatch(ShownStudentAnswersActions.loadShownStudentAnswersByQuestion({
			uuid: questionUuid
		}));

	}

	private initializeAvailableTestsSubscription() {
		this.subscriptions.push(
			this.store.select(selectAvailableTests).subscribe(availableTests => {
				this.availableTests = availableTests;
			})
		);
	}

	private initializeShownStudentAnswersSubscriptions() {
		this.subscriptions.push(
			this.store.select(selectShownStudentAnswersStatus).subscribe(shownStudentAnswersStatus => {
				this.shownStudentAnswersStatus = shownStudentAnswersStatus;
			}),
			this.store.select(selectShownStudentAnswers).subscribe(shownStudentAnswers => {
				this.shownStudentAnswers = shownStudentAnswers;
			})
		);
	}
}
