import { createAction, props } from '@ngrx/store';
import { StudentAnswer } from '../../models/student-answer';

export enum ShownStudentAnswersAction {
	LoadShownStudentAnswersByQuestion = '[StudentAnswers] Load studentAnswers to show by question',
	UpdateShownStudentAnswersByQuestion = '[StudentAnswers] Update studentAnswers to show by question',
	SetShownStudentAnswers = '[StudentAnswers] Set studentAnswers to show',
	ShownStudentAnswersLoaded = '[StudentAnswers] Loaded studentAnswers to show',
	ClearShownStudentAnswers = '[StudentAnswers] Clear shown studentAnswers'
}

export const loadShownStudentAnswersByQuestion = createAction(
	ShownStudentAnswersAction.LoadShownStudentAnswersByQuestion,
	props<{
		uuid: string;
	}>()
);

export const updateShownStudentAnswersByQuestion = createAction(
	ShownStudentAnswersAction.UpdateShownStudentAnswersByQuestion,
	props<{
		uuid: string;
	}>()
);

export const setShownStudentAnswers = createAction(
	ShownStudentAnswersAction.SetShownStudentAnswers,
	props<{
		studentAnswers: StudentAnswer[];
	}>()
);

export const shownStudentAnswersLoaded = createAction(
	ShownStudentAnswersAction.ShownStudentAnswersLoaded,
	props<{
		studentAnswers: StudentAnswer[];
	}>()
);

export const clearShownStudentAnswers = createAction(
	ShownStudentAnswersAction.ClearShownStudentAnswers
);
