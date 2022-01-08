import { ActionCreator, createAction } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { ResponseError } from './http';

export function createHttpActions<RequestPayload = void, ResponsePayload = void, ErrorPayload = ResponseError>(
	actionType: string
): [
	ActionCreator<string, (props: RequestPayload) => { payload?: RequestPayload } & TypedAction<string>>,
	ActionCreator<string, (props: ResponsePayload) => { payload?: ResponsePayload } & TypedAction<string>>,
	ActionCreator<string, (props: ErrorPayload) => { payload?: ErrorPayload } & TypedAction<string>>,
] {
	return [
		createAction(actionType, (payload?: RequestPayload) => ({ payload })),
		createAction(`${actionType} Success`, (payload?: ResponsePayload) => ({ payload })),
		createAction(`${actionType} Error`, (payload?: ErrorPayload) => ({ payload }))
	];
}