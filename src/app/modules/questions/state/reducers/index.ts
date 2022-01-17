import { on } from '@ngrx/store';
import { ResourceStatus } from '../../../../state/global.state';
import { ShownQuestionActions } from '../actions';
import { QuestionsState } from '../questions.state';

export default [
	on<QuestionsState, [typeof ShownQuestionActions.loadShownQuestion]>(
		ShownQuestionActions.loadShownQuestion,
		(state): QuestionsState => ({
			...state,
			questionShown: null,
			questionShownStatus: ResourceStatus.Loading
		})
	),
	on<QuestionsState, [typeof ShownQuestionActions.updateShownQuestion]>(
		ShownQuestionActions.updateShownQuestion,
		(state): QuestionsState => ({
			...state,
			questionShownStatus: ResourceStatus.Loading
		})
	),
	on<QuestionsState, [typeof ShownQuestionActions.setShownQuestion]>(
		ShownQuestionActions.setShownQuestion,
		(state, { question }): QuestionsState => ({
			questionShown: question,
			questionShownStatus: ResourceStatus.Loaded
		}))
];