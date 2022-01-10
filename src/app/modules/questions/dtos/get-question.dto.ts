import { GetBaseQuestionDTO } from './get-base-question.dto';

export interface GetQuestionDTO extends GetBaseQuestionDTO {
	processed: string;
}