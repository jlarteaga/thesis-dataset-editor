import { GetQuestionDTO } from '../../questions/dtos/get-question.dto';
import { GetTextBaseDTO } from '../../texts/dtos/get-text-base.dto';
import { ProcessingStatus } from '../models/text';

export interface GetBaseStudentAnswerDTO<T extends GetTextBaseDTO> {
	uuid: string;
	grade: number;
	grades: {
		me: number;
		other: number;
	};
	student: number;
	question: GetQuestionDTO;
	text: T;
	similarityMatricesStatus: ProcessingStatus;
}