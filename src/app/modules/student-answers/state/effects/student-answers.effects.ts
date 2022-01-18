import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { StudentAnswer } from '../../models/student-answer';
import { StudentAnswersService } from '../../services/student-answers.service';
import { ShownStudentAnswerActions, ShownStudentAnswersActions } from '../actions';

@Injectable()
export class StudentAnswersEffects {

	getShownStudent$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownStudentAnswerActions.loadShownStudentAnswer, ShownStudentAnswerActions.updateShownStudentAnswer),
			exhaustMap(({ uuid }) => this.studentAnswersService.getById(uuid)),
			map(getStudentAnswerDTO => {
				return StudentAnswer.fromDetailedDTO(getStudentAnswerDTO);
			}),
			map(studentAnswer => ShownStudentAnswerActions.setShownStudentAnswer({
				studentAnswer
			}))
		));

	setShownStudentAnswer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownStudentAnswerActions.setShownStudentAnswer),
			map(({ studentAnswer }) => ShownStudentAnswerActions.shownStudentAnswerLoaded({
				studentAnswer
			}))
		));

	getShownStudents$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				ShownStudentAnswersActions.loadShownStudentAnswersByQuestion,
				ShownStudentAnswersActions.updateShownStudentAnswersByQuestion
			),
			exhaustMap(({ uuid }) => this.studentAnswersService.getAllByQuestionUuid(uuid)),
			map(getStudentAnswerDTOs =>
				getStudentAnswerDTOs.map(getStudentAnswerDTO =>
					StudentAnswer.fromSummarizedDTO(getStudentAnswerDTO)
				)
			),
			map(studentAnswers => ShownStudentAnswersActions.setShownStudentAnswers({
				studentAnswers
			}))
		));

	setShownStudentAnswers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownStudentAnswersActions.setShownStudentAnswers),
			map(({ studentAnswers }) => ShownStudentAnswersActions.shownStudentAnswersLoaded({
				studentAnswers
			}))
		));

	constructor(
		private actions$: Actions,
		private studentAnswersService: StudentAnswersService
	) {
	}
}