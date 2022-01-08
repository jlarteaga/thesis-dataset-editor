import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { QuestionsService } from '../../modules/questions/services/questions.service';
import { QuestionActions } from '../actions';

@Injectable()
export class QuestionEffects {

	getAll$ = createEffect(() => this.actions$.pipe(
		ofType(QuestionActions.getAllQuestions),
		exhaustMap(() =>
			this.questionsService.getAll()
				.pipe(
					map(questions => QuestionActions.getAllQuestionsSuccess(questions))
				)
		),
		catchError(error => of(QuestionActions.getAllQuestionsError(error)))
	));

	constructor(
		private actions$: Actions,
		private questionsService: QuestionsService
	) {
	}
}