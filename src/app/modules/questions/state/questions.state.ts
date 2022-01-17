import { ResourceStatus } from '../../../state/global.state';
import { Question } from '../../questions/models/question';

export interface QuestionsState {
	questionShown: Question | null;
	questionShownStatus: ResourceStatus;
}

export const questionsInitialState: QuestionsState = {
	questionShown: null,
	questionShownStatus: ResourceStatus.NotLoaded
};
