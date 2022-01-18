import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { Question } from '../../models/question';
import { QuestionsService } from '../../services/questions.service';
import { ShownQuestionActions, ShownQuestionsActions } from '../actions';

@Injectable()
export class QuestionsEffects {

	getShownQuestion$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownQuestionActions.loadShownQuestion, ShownQuestionActions.updateShownQuestion),
			exhaustMap(({ uuid }) => this.questionsService.getById(uuid)),
			map(getQuestionDTO => Question.fromDTO(getQuestionDTO)),
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

	getShownQuestions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownQuestionsActions.loadShownQuestions, ShownQuestionsActions.updateShownQuestions),
			exhaustMap(() => this.questionsService.getAll()),
			map(getQuestionDTOs => getQuestionDTOs.map(getQuestionDTO => Question.fromDTO(getQuestionDTO))),
			map(questions => ShownQuestionsActions.setShownQuestions({
				questions
			}))
		));

	setShownQuestions$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownQuestionsActions.setShownQuestions),
			map(({ questions }) => ShownQuestionsActions.shownQuestionsLoaded({
				questions
			}))
		));

	constructor(
		private actions$: Actions,
		private questionsService: QuestionsService
	) {
	}

}