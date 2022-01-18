import { createSelector } from '@ngrx/store';
import { ResourceStatus } from '../../../../state/global.state';
import { AvailableLanguage } from '../../../student-answers/models/text';
import { Question } from '../../models/question';
import { QUESTIONS_FEATURE_NAME } from '../questions.feature';
import { QuestionsState } from '../questions.state';

export type AvailableTests = Record<AvailableLanguage, ParsedTest[]>;

export interface ParsedQuestion {
	id: number;
	question: Question;
}

export interface ParsedTest {
	id: number;
	questions: ParsedQuestion[];
}

export const selectQuestionsState = (state: any): QuestionsState => {
	return state[QUESTIONS_FEATURE_NAME];
};

export const selectShownQuestion: (state: any) => (Question | null) = createSelector(
	selectQuestionsState,
	(state) => state.questionShown
);

export const selectShownQuestionStatus: (state: any) => ResourceStatus = createSelector(
	selectQuestionsState,
	(state) => state.questionShownStatus
);

export const selectShownQuestions: (state: any) => (Question[] | null) = createSelector(
	selectQuestionsState,
	(state) => state.questionsShown
);

export const selectShownQuestionsStatus: (state: any) => ResourceStatus = createSelector(
	selectQuestionsState,
	(state) => state.questionsShownStatus
);

export const selectSendingTextProcessRequest: (state: any) => boolean = createSelector(
	selectQuestionsState,
	(state) => state.sendingProcessTextRequest
);

export const selectAvailableTests: (state: any) => (AvailableTests | null) = createSelector(
	selectShownQuestions,
	(questions) => {
		if (!questions) {
			return null;
		}
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
);