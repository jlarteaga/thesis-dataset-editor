import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap } from 'rxjs';
import { TranslationNodesActions } from 'src/app/modules/translations/state/actions';
import { QuestionsService } from '../../services/questions.service';

@Injectable()
export class QuestionsEffects {

	patchQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TranslationNodesActions.patchQuestion),
			exhaustMap(({ uuid, patch }) =>
				this.questionsService.updateById(uuid, patch).pipe(
					switchMap(() =>
						this.questionsService.getById(uuid).pipe(
							map((getQuestionDTO) => TranslationNodesActions.questionPatched({
								uuid: uuid,
								question: getQuestionDTO
							}))
						)
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private questionsService: QuestionsService
	) {
	}
}