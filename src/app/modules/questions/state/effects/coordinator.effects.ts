import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { ErrorActions, GeneralActions } from 'src/app/state/actions';
import { CoordinatorService } from '../../../shared/services/coordinator.service';
import { ShownQuestionActions } from '../actions';
import { textProcessingForQuestionRequested } from '../actions/shown-question';

@Injectable()
export class CoordinatorEffects {

	onProcessTextRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownQuestionActions.requestTextProcessingForQuestion),
			exhaustMap(({ uuid }) =>
				this.coordinatorService.requestProcessingForQuestion(uuid)),
			map(operationResponse => textProcessingForQuestionRequested({
				response: operationResponse
			}))
		)
	);

	onTextProcessingForQuestionRequested$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownQuestionActions.textProcessingForQuestionRequested),
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