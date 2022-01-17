import { createAction, props } from '@ngrx/store';

export enum ErrorAction {
	DisplayError = '[Error] Display error'
}

export const displayError = createAction(
	ErrorAction.DisplayError,
	props<{
		message: string;
	}>()
);