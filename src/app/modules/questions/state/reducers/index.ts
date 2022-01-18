import { on } from '@ngrx/store';
import { ResourceStatus } from '../../../../state/global.state';
import { ProcessingStatus } from '../../../student-answers/models/text';
import { ShownQuestionActions, ShownQuestionsActions } from '../actions';
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
			...state,
			questionShown: question,
			questionShownStatus: ResourceStatus.Loaded
		})
	),
	on<QuestionsState, [typeof ShownQuestionsActions.loadShownQuestions]>(
		ShownQuestionsActions.loadShownQuestions,
		(state): QuestionsState => ({
			...state,
			questionsShown: null,
			questionsShownStatus: ResourceStatus.Loading
		})
	),
	on<QuestionsState, [typeof ShownQuestionsActions.updateShownQuestions]>(
		ShownQuestionsActions.updateShownQuestions,
		(state): QuestionsState => ({
			...state,
			questionsShownStatus: ResourceStatus.Loading
		})
	),
	on<QuestionsState, [typeof ShownQuestionsActions.setShownQuestions]>(
		ShownQuestionsActions.setShownQuestions,
		(state, { questions }): QuestionsState => ({
			...state,
			questionsShown: questions,
			questionsShownStatus: ResourceStatus.Loaded
		})
	),
	on<QuestionsState, [typeof ShownQuestionActions.requestTextProcessingForQuestion]>(
		ShownQuestionActions.requestTextProcessingForQuestion,
		(state): QuestionsState => ({
			...state,
			sendingProcessTextRequest: true
		})
	),
	on<QuestionsState, [typeof ShownQuestionActions.textProcessingForQuestionRequested]>(
		ShownQuestionActions.textProcessingForQuestionRequested,
		({ questionShown, sendingProcessTextRequest, ...state }, { response }): QuestionsState => {
			const newSendingProcessingRequest = false;
			if (!response.success || !questionShown) {
				return {
					...state,
					questionShown,
					sendingProcessTextRequest: newSendingProcessingRequest
				};
			}
			const newAnswer = {
				...questionShown.answer,
				processingStatus: ProcessingStatus.Processing
			};
			return {
				...state,
				questionShown: {
					...questionShown,
					answer: newAnswer
				},
				sendingProcessTextRequest: newSendingProcessingRequest
			};
		}
	)
];