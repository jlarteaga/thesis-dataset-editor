import { createAction, props } from '@ngrx/store';
import { StudentAnswer } from '../../models/student-answer';

export enum ShownStudentAnswerAction {
	LoadShownStudentAnswer = '[StudentAnswers] Load student answer to show',
	UpdateShownStudentAnswer = '[StudentAnswers] Update student answer to show',
	SetShownStudentAnswer = '[StudentAnswers] Set student answer to show',
	ShownStudentAnswerLoaded = '[StudentAnswers] Loaded student answer to show'
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