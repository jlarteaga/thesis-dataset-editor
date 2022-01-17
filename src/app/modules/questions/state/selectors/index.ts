import { createSelector } from '@ngrx/store';
import { ResourceStatus } from '../../../../state/global.state';
import { Question } from '../../models/question';
import { QUESTIONS_FEATURE_NAME } from '../questions.feature';
import { QuestionsState } from '../questions.state';

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