import { createFeature, createReducer } from '@ngrx/store';
import reducers from './reducers';
import { studentAnswersInitialState, StudentAnswersState } from './student-answers.state';

export const STUDENT_ANSWERS_FEATURE_NAME = 'student-answers';

export const studentAnswersFeature = createFeature({
	name: STUDENT_ANSWERS_FEATURE_NAME,
	reducer: createReducer<StudentAnswersState>(
		studentAnswersInitialState,
		...reducers
	)
});