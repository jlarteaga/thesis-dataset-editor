import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { ResourceStatus } from '../../../../state/global.state';
import { AvailableLanguage } from '../../../student-answers/models/text';
import { Question } from '../../models/question';
import { ShownQuestionsActions } from '../../state/actions';
import { selectShownQuestions, selectShownQuestionsStatus } from '../../state/selectors';

interface ParsedQuestion {
	id: number;
	question: Question;
}

interface ParsedTest {
	id: number;
	questions: ParsedQuestion[];
}

type AvailableTests = Record<AvailableLanguage, ParsedTest[]>;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
	readonly ResourceStatus = ResourceStatus;
	readonly AvailableLanguage = AvailableLanguage;
	shownQuestionsStatus: ResourceStatus = ResourceStatus.NotLoaded;
	availableTests: Record<AvailableLanguage, ParsedTest[]> | null = null;
	lang: AvailableLanguage = AvailableLanguage.Es;
	private subscriptions: Subscription[] = [];

	constructor(
		private store: Store
	) {
		this.store.dispatch(ShownQuestionsActions.updateShownQuestions());
		this.initializeShownQuestionsSubscriptions();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	private initializeShownQuestionsSubscriptions() {
		this.subscriptions.push(
			this.store.select(selectShownQuestionsStatus)
				.subscribe(shownQuestionsStatus => {
					this.shownQuestionsStatus = shownQuestionsStatus;
				})
		);
		this.subscriptions.push(
			this.store.select(selectShownQuestions)
				.pipe(
					map(questions => this.parseQuestions(questions || []))
				)
				.subscribe((availableTests: AvailableTests) => {
					this.availableTests = availableTests;
				})
		);
	}

	private parseQuestions(questions: Question[]): AvailableTests {
		const availableTests: AvailableTests = {
			[AvailableLanguage.En]: [],
			[AvailableLanguage.Es]: []
		};
		questions.forEach((question) => {
			const [testId, questionId] = Question.getTestAndQuestionNumber(question.label);
			const currentTests = availableTests[question.lang];
			if (!currentTests[testId - 1]) {
				currentTests[testId - 1] = {
					id: testId,
					questions: []
				};
			}
			const currentTest: ParsedTest = currentTests[testId - 1];
			currentTest.questions[questionId - 1] = {
				id: questionId,
				question
			};
		});
		return availableTests;
	}
}
