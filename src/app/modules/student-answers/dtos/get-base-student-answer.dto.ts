import { GetBaseQuestionDTO } from '../../questions/dtos/get-base-question.dto';
import { Text } from '../models/text';

export interface GetBaseStudentAnswerDto {
	uuid: string;
	grade: number;
	grades: {
		me: number;
		other: number;
	};
	student: number;
	question: GetBaseQuestionDTO;
	text: Text;
}