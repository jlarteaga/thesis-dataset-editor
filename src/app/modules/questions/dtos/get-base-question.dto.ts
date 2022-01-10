import { Text } from '../../student-answers/models/text';

export interface GetBaseQuestionDTO {
	uuid: string;
	rawStatement: string;
	sentStatement: string;
	lang: string;
	label: string;
	answer: Text;
}