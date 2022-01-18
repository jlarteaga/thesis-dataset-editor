import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { ErrorActions, GeneralActions } from 'src/app/state/actions';
import { CoordinatorService } from '../../../shared/services/coordinator.service';
import { ShownStudentAnswerActions } from '../actions';

@Injectable()
export class CoordinatorEffects {

	onProcessTextRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownStudentAnswerActions.requestTextProcessingForStudentAnswer),
			exhaustMap(({ uuid }) =>
				this.coordinatorService.requestProcessingForStudentAnswer(uuid)),
			map(operationResponse => ShownStudentAnswerActions.textProcessingForStudentAnswerRequested({
				response: operationResponse
			}))
		)
	);

	onTextProcessingForStudentAnswerRequested$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownStudentAnswerActions.textProcessingForStudentAnswerRequested),
			map(({ response }) => (
				response.success
					? GeneralActions.noop()
					: ErrorActions.displayError({
						message: response.message
					})))
		));

	constructor(
		private actions$: Actions,
		private coordinatorService: CoordinatorService
	) {
	}
}