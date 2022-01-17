import { createAction } from '@ngrx/store';

export enum GeneralAction {
	Noop = 'noop'
}

export const noop = createAction(GeneralAction.Noop);
