import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { StudentAnswer } from '../../models/student-answer';
import { StudentAnswersService } from '../../services/student-answers.service';
import { ShownStudentAnswerActions } from '../actions';

@Injectable()
export class StudentAnswersEffects {

	getShownStudent$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShownStudentAnswerActions.loadShownStudentAnswer, ShownStudentAnswerActions.updateShownStudentAnswer),
			exhaustMap(({ uuid }) => this.studentAnswersService.getById(uuid)),
			map(getStudentAnswerDTO => StudentAnswer.fromDTO(getStudentAnswerDTO)),
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

	constructor(
		private actions$: Actions,
		private studentAnswersService: StudentAnswersService
	) {
	}
}