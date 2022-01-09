import { SupportedLanguage } from '../../../utils/global-types';

export interface Text {
	uuid: string;
	lang: SupportedLanguage;
	raw: string;
	sent?: string;
	processed?: string;
	status: string;
}