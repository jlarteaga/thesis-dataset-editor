import { ResourceStatus } from '../../../state/global.state';
import { Question } from '../models/question';

export interface QuestionsState {
	questionShown: Question | null;
	questionShownStatus: ResourceStatus;
	questionsShown: Question[] | null;
	questionsShownStatus: ResourceStatus;
	sendingProcessTextRequest: boolean;
}

export const questionsInitialState: QuestionsState = {
	questionShown: null,
	questionShownStatus: ResourceStatus.NotLoaded,
	questionsShown: null,
	questionsShownStatus: ResourceStatus.NotLoaded,
	sendingProcessTextRequest: false
};
