import { ResourceStatus } from '../../../state/global.state';
import { Question } from '../models/question';

export interface QuestionsState {
	questionShown: Question | null;
	questionShownStatus: ResourceStatus;
	sendingProcessTextRequest: boolean;
}

export const questionsInitialState: QuestionsState = {
	questionShown: null,
	questionShownStatus: ResourceStatus.NotLoaded,
	sendingProcessTextRequest: false
};
