import { AvailableLanguage, Text } from '../../student-answers/models/text';

export interface GetBaseQuestionDTO {
	uuid: string;
	rawStatement: string;
	sentStatement: string;
	lang: AvailableLanguage;
	label: string;
	answer: Text;
}