import { GetBaseQuestionDTO } from '../../questions/dtos/get-base-question.dto';
import { GetStudentAnswerSummarizedDTO } from '../dtos/get-student-answer-summarized.dto';
import { Text } from './text';

export class StudentAnswer {

	uuid: string;
	grade: number;
	grades: {
		me: number;
		other: number;
	};
	question: GetBaseQuestionDTO;
	text: Text;
	student: number;

	static fromDTO(
		{
			uuid,
			student,
			text,
			question,
			grades,
			grade
		}: GetStudentAnswerSummarizedDTO
	): StudentAnswer {
		return new StudentAnswer({
			uuid,
			question,
			text,
			grade,
			grades,
			student
		});
	}

	constructor(studentAnswer: StudentAnswer) {
		this.uuid = studentAnswer.uuid;
		this.grade = studentAnswer.grade;
		this.grades = studentAnswer.grades;
		this.question = studentAnswer.question;
		this.text = studentAnswer.text;
		this.student = studentAnswer.student;
	}
}
