import { on } from '@ngrx/store';
import { ResourceStatus } from '../../../../state/global.state';
import { ShownStudentAnswerActions } from '../actions';
import { StudentAnswersState } from '../student-answers.state';

export default [
	on<StudentAnswersState, [typeof ShownStudentAnswerActions.loadShownStudentAnswer]>(
		ShownStudentAnswerActions.loadShownStudentAnswer,
		(state): StudentAnswersState => ({
			...state,
			studentAnswerShown: null,
			studentAnswerShownStatus: ResourceStatus.Loading
		})
	),
	on<StudentAnswersState, [typeof ShownStudentAnswerActions.updateShownStudentAnswer]>(
		ShownStudentAnswerActions.updateShownStudentAnswer,
		(state): StudentAnswersState => ({
			...state,
			studentAnswerShownStatus: ResourceStatus.Loading
		})
	),
	on<StudentAnswersState, [typeof ShownStudentAnswerActions.setShownStudentAnswer]>(
		ShownStudentAnswerActions.setShownStudentAnswer,
		(state, { studentAnswer }): StudentAnswersState => ({
			...state,
			studentAnswerShown: studentAnswer,
			studentAnswerShownStatus: ResourceStatus.Loaded
		})
	)
];