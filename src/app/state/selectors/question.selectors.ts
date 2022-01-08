import { questionsFeatureKey, State } from '../reducers';

export const selectAllQuestions = (state: State) => state[questionsFeatureKey].questions || [];
