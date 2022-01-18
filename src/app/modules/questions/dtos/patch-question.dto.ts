import { SupportedLanguage } from '../../../utils/global-types';
import { TextStatus } from '../../student-answers/models/text';

export interface PatchQuestionDTO {
	raw?: string;
	sent?: string;
	processed?: string;
	status?: TextStatus;
	lang?: SupportedLanguage;
	label?: string;
	rawStatement?: string;
	sentStatement?: string;
}