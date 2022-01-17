import { createFeature, createReducer } from '@ngrx/store';
import { questionsInitialState, QuestionsState } from './questions.state';
import reducers from './reducers';

export const QUESTIONS_FEATURE_NAME = 'questions';

export const questionsFeature = createFeature({
	name: QUESTIONS_FEATURE_NAME,
	reducer: createReducer<QuestionsState>(
		questionsInitialState,
		...reducers
	)
});