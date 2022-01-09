import { BaseQuestionDTO } from '../../questions/models/question';
import { GetAllStudentAnswerDTO } from '../dtos/get-all-student-answer.dto';
import { Text } from './text';

export class StudentAnswer {

	uuid: string;
	grade: number;
	grades: {
		me: number;
		other: number;
	};
	question: BaseQuestionDTO;
	text: Text;
	student: number;

	static fromDto(
		{
			uuid,
			student,
			text,
			question,
			grades,
			grade
		}: GetAllStudentAnswerDTO
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
