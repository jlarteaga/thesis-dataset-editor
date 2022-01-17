import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { Question } from '../../models/question';
import { QuestionsService } from '../../services/questions.service';
import { ShownQuestionActions } from '../actions';

@Injectable()
export class QuestionsEffects {

	getShownQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownQuestionActions.loadShownQuestion, ShownQuestionActions.updateShownQuestion),
			exhaustMap(({ uuid }) => this.questionsService.getById(uuid)),
			map(getQuestionDTO => Question.fromDto(getQuestionDTO)),
			map(question => ShownQuestionActions.setShownQuestion({
				question
			}))
		));

	setShownQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownQuestionActions.setShownQuestion),
			map(({ question }) => ShownQuestionActions.shownQuestionLoaded({
				question
			}))
		));

	constructor(
		private actions$: Actions,
		private questionsService: QuestionsService
	) {
	}

}