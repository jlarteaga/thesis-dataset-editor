import { createAction, props } from '@ngrx/store';
import { OperationResponse } from '../../../shared/services/coordinator.service';
import { StudentAnswer } from '../../models/student-answer';

export enum ShownStudentAnswerAction {
	LoadShownStudentAnswer = '[StudentAnswers] Load student answer to show',
	UpdateShownStudentAnswer = '[StudentAnswers] Update student answer to show',
	SetShownStudentAnswer = '[StudentAnswers] Set student answer to show',
	ShownStudentAnswerLoaded = '[StudentAnswers] Loaded student answer to show',
	RequestTextProcessingForStudentAnswer = '[StudentAnswers] Request text processing',
	TextProcessingForStudentAnswerRequested = '[StudentAnswers] Text processing requested',
}

export const loadShownStudentAnswer = createAction(
	ShownStudentAnswerAction.LoadShownStudentAnswer,
	props<{
		uuid: string;
	}>()
);

export const updateShownStudentAnswer = createAction(
	ShownStudentAnswerAction.UpdateShownStudentAnswer,
	props<{
		uuid: string;
	}>()
);

export const setShownStudentAnswer = createAction(
	ShownStudentAnswerAction.SetShownStudentAnswer,
	props<{
		studentAnswer: StudentAnswer;
	}>()
);

export const shownStudentAnswerLoaded = createAction(
	ShownStudentAnswerAction.ShownStudentAnswerLoaded,
	props<{
		studentAnswer: StudentAnswer
	}>()
);

export const requestTextProcessingForStudentAnswer = createAction(
	ShownStudentAnswerAction.RequestTextProcessingForStudentAnswer,
	props<{
		uuid: string
	}>()
);

export const textProcessingForStudentAnswerRequested = createAction(
	ShownStudentAnswerAction.TextProcessingForStudentAnswerRequested,
	props<{
		response: OperationResponse
	}>()
);