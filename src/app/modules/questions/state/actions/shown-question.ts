import { createAction, props } from '@ngrx/store';
import { OperationResponse } from '../../../shared/services/coordinator.service';
import { Question } from '../../models/question';

export enum ShownQuestionAction {
	LoadShownQuestion = '[Questions] Load question to show',
	UpdateShownQuestion = '[Questions] Update question to show',
	SetShownQuestion = '[Questions] Set question to show',
	ShownQuestionLoaded = '[Questions] Loaded question to show',
	RequestTextProcessingForQuestion = '[Questions] Request text processing',
	TextProcessingForQuestionRequested = '[Questions] Text processing requested',
}

export const loadShownQuestion = createAction(
	ShownQuestionAction.LoadShownQuestion,
	props<{
		uuid: string;
	}>()
);

export const updateShownQuestion = createAction(
	ShownQuestionAction.UpdateShownQuestion,
	props<{
		uuid: string;
	}>()
);

export const setShownQuestion = createAction(
	ShownQuestionAction.SetShownQuestion,
	props<{
		question: Question;
	}>()
);

export const shownQuestionLoaded = createAction(
	ShownQuestionAction.ShownQuestionLoaded,
	props<{
		question: Question
	}>()
);

export const requestTextProcessingForQuestion = createAction(
	ShownQuestionAction.RequestTextProcessingForQuestion,
	props<{
		uuid: string;
	}>()
);

export const textProcessingForQuestionRequested = createAction(
	ShownQuestionAction.TextProcessingForQuestionRequested,
	props<{
		response: OperationResponse;
	}>()
);