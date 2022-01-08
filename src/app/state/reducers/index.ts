import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Question } from '../../modules/questions/models/question';
import { QuestionActions } from '../actions';

export const questionsFeatureKey = 'questions';

export interface QuestionsState {
	questions: Question[];
}

export interface State {
	[questionsFeatureKey]: QuestionsState;
}

const initialQuestionsState: QuestionsState = {
	questions: []
};

export const initialState: State = {
	[questionsFeatureKey]: initialQuestionsState
};

export const reducers: ActionReducerMap<State> = {
	[questionsFeatureKey]: createReducer<QuestionsState>(
		initialQuestionsState,
		on(QuestionActions.getAllQuestionsSuccess, (state, { payload }) => ({
			...state,
			questions: (payload || []).map(Question.fromDto)
		}))
	)
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
