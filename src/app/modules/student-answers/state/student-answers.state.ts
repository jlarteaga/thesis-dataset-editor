import { ResourceStatus } from '../../../state/global.state';
import { StudentAnswer } from '../models/student-answer';

export interface StudentAnswersState {
	studentAnswerShown: StudentAnswer | null;
	studentAnswerShownStatus: ResourceStatus;
	sendingProcessTextRequest: boolean;
	studentAnswersShown: StudentAnswer[] | null;
	studentAnswersShownStatus: ResourceStatus;
}

export const studentAnswersInitialState: StudentAnswersState = {
	studentAnswerShown: null,
	studentAnswerShownStatus: ResourceStatus.NotLoaded,
	sendingProcessTextRequest: false,
	studentAnswersShown: null,
	studentAnswersShownStatus: ResourceStatus.NotLoaded
};
