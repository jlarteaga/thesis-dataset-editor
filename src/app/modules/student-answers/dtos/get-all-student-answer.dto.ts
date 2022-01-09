import { BaseQuestionDTO } from '../../questions/models/question';
import { Text } from '../models/text';

export interface GetAllStudentAnswerDTO {
	uuid: string;
	grade: number;
	grades: {
		me: number;
		other: number;
	};
	student: number;
	question: BaseQuestionDTO;
	text: Text;
}