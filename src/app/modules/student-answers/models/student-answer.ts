import { GetBaseQuestionDTO } from '../../questions/dtos/get-base-question.dto';
import { GetStudentAnswerDetailedDTO } from '../dtos/get-student-answer-detailed.dto';
import { GetStudentAnswerSummarizedDTO } from '../dtos/get-student-answer-summarized.dto';
import { SimilarityMatricesDTO } from '../dtos/similarity-matrices.dto';
import { ProcessingStatus, Text } from './text';

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
	similarityMatrices?: SimilarityMatricesDTO;
	similarityMatricesStatus?: ProcessingStatus;

	static fromSummarizedDTO(
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
			student,

		});
	}

	static fromDetailedDTO(
		{
			uuid,
			student,
			text,
			question,
			grades,
			grade,
			similarityMatrices,
			similarityMatricesStatus
		}: GetStudentAnswerDetailedDTO
	): StudentAnswer {
		return new StudentAnswer({
			uuid,
			question,
			text: Text.fromDetailedDTO(text),
			grade,
			grades,
			student,
			similarityMatrices,
			similarityMatricesStatus
		});
	}

	constructor(studentAnswer: StudentAnswer) {
		this.uuid = studentAnswer.uuid;
		this.grade = studentAnswer.grade;
		this.grades = studentAnswer.grades;
		this.question = studentAnswer.question;
		this.text = studentAnswer.text;
		this.student = studentAnswer.student;
		this.similarityMatricesStatus = studentAnswer.similarityMatricesStatus;
		this.similarityMatrices = studentAnswer.similarityMatrices;
	}
}
