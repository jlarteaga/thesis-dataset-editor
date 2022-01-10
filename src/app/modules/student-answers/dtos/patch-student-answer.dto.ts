import { SupportedLanguage } from '../../../utils/global-types';

export interface PatchStudentAnswerDTO {
	raw?: string;
	sent?: string;
	processed?: string;
	status?: string;
	lang?: SupportedLanguage;
	gradeMe?: number;
	gradeOther?: number;
	student?: number;
}