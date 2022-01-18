import { SupportedLanguage } from '../../../utils/global-types';
import { ProcessingStatus, TextStatus } from '../../student-answers/models/text';

export interface GetTextBaseDTO {
	uuid: string;
	lang: SupportedLanguage;
	raw: string;
	sent?: string;
	processingStatus: ProcessingStatus;
	status: TextStatus;
}