import { createSelector } from '@ngrx/store';
import { ResourceStatus } from '../../../../state/global.state';
import { StudentAnswer } from '../../models/student-answer';
import { STUDENT_ANSWERS_FEATURE_NAME } from '../student-answers.feature';
import { StudentAnswersState } from '../student-answers.state';

export const selectStudentAnswersState = (state: any): StudentAnswersState => {
	return state[STUDENT_ANSWERS_FEATURE_NAME];
};

export const selectShownStudentAnswer: (state: any) => (StudentAnswer | null) = createSelector(
	selectStudentAnswersState,
	(state) => state.studentAnswerShown
);

export const selectShownStudentAnswerStatus: (state: any) => ResourceStatus = createSelector(
	selectStudentAnswersState,
	(state) => state.studentAnswerShownStatus
);

export const selectShownStudentAnswers: (state: any) => (StudentAnswer[] | null) = createSelector(
	selectStudentAnswersState,
	(state) => state.studentAnswersShown
);

export const selectShownStudentAnswersStatus: (state: any) => ResourceStatus = createSelector(
	selectStudentAnswersState,
	(state) => state.studentAnswersShownStatus
);

export const selectSendingTextProcessRequest: (state: any) => boolean = createSelector(
	selectStudentAnswersState,
	(state) => state.sendingProcessTextRequest
);