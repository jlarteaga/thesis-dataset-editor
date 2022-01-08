import { BaseQuestionDTO } from '../../questions/models/question';

export interface StudentAnswer {
	uuid: string;
	grade: number;
	grades: {
		me: number;
		other: number;
	};
	question: BaseQuestionDTO;
	text: Text;
}
