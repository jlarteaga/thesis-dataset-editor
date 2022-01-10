import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap } from 'rxjs';
import { TranslationNodesActions } from 'src/app/modules/translations/state/actions';
import { StudentAnswersService } from '../../services/student-answers.service';

@Injectable()
export class StudentAnswersEffects {

	patchStudentAnswer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TranslationNodesActions.patchStudentAnswer),
			exhaustMap(({ uuid, patch }) =>
				this.studentAnswersService.updateById(uuid, patch).pipe(
					switchMap(() =>
						this.studentAnswersService.getById(uuid).pipe(
							map((getStudentAnswerDTO) => TranslationNodesActions.studentAnswerPatched({
								uuid: uuid,
								studentAnswer: getStudentAnswerDTO
							}))
						)
					)
				)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private studentAnswersService: StudentAnswersService
	) {
	}
}