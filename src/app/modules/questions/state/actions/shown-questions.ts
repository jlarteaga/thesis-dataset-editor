import { createAction, props } from '@ngrx/store';
import { Question } from '../../models/question';

export enum ShownQuestionsAction {
	LoadShownQuestions = '[Questions] Load questions to show',
	UpdateShownQuestions = '[Questions] Update questions to show',
	SetShownQuestions = '[Questions] Set questions to show',
	ShownQuestionsLoaded = '[Questions] Loaded questions to show'
}

export const loadShownQuestions = createAction(
	ShownQuestionsAction.LoadShownQuestions
);

export const updateShownQuestions = createAction(
	ShownQuestionsAction.UpdateShownQuestions
);

export const setShownQuestions = createAction(
	ShownQuestionsAction.SetShownQuestions,
	props<{
		questions: Question[];
	}>()
);

export const shownQuestionsLoaded = createAction(
	ShownQuestionsAction.ShownQuestionsLoaded,
	props<{
		questions: Question[];
	}>()
);