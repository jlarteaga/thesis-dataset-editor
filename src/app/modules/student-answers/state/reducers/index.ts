import { on } from '@ngrx/store';
import { ResourceStatus } from '../../../../state/global.state';
import { ProcessingStatus } from '../../models/text';
import { ShownStudentAnswerActions } from '../actions';
import { StudentAnswersState } from '../student-answers.state';

export default [
	on<StudentAnswersState, [typeof ShownStudentAnswerActions.loadShownStudentAnswer]>(
		ShownStudentAnswerActions.loadShownStudentAnswer,
		(state): StudentAnswersState => ({
			...state,
			studentAnswerShown: null,
			studentAnswerShownStatus: ResourceStatus.Loading
		})
	),
	on<StudentAnswersState, [typeof ShownStudentAnswerActions.updateShownStudentAnswer]>(
		ShownStudentAnswerActions.updateShownStudentAnswer,
		(state): StudentAnswersState => ({
			...state,
			studentAnswerShownStatus: ResourceStatus.Loading
		})
	),
	on<StudentAnswersState, [typeof ShownStudentAnswerActions.setShownStudentAnswer]>(
		ShownStudentAnswerActions.setShownStudentAnswer,
		(state, { studentAnswer }): StudentAnswersState => ({
			...state,
			studentAnswerShown: studentAnswer,
			studentAnswerShownStatus: ResourceStatus.Loaded
		})
	),
	on<StudentAnswersState, [typeof ShownStudentAnswerActions.requestTextProcessingForStudentAnswer]>(
		ShownStudentAnswerActions.requestTextProcessingForStudentAnswer,
		(state): StudentAnswersState => ({
			...state,
			sendingProcessTextRequest: true
		})
	),
	on<StudentAnswersState, [typeof ShownStudentAnswerActions.textProcessingForStudentAnswerRequested]>(
		ShownStudentAnswerActions.textProcessingForStudentAnswerRequested,
		({ studentAnswerShown, sendingProcessTextRequest, ...state }, { response }): StudentAnswersState => {
			const newSendingProcessingRequest = false;
			if (!response.success || !studentAnswerShown) {
				return {
					...state,
					studentAnswerShown,
					sendingProcessTextRequest: newSendingProcessingRequest
				};
			}
			const newStudentAnswerText = {
				...studentAnswerShown.text,
				processingStatus: ProcessingStatus.Processing
			};
			return {
				...state,
				studentAnswerShown: {
					...studentAnswerShown,
					text: newStudentAnswerText
				},
				sendingProcessTextRequest: newSendingProcessingRequest
			};
		}
	)
];