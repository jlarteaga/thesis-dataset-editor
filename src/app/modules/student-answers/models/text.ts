import { SupportedLanguage } from '../../../utils/global-types';

export enum TextStatus {
	OriginalCleaned = 'or-cleaned',
	Empty = 'empty',
	TranslatedAutomatically = 'tr-auto',
	CleanedTranslated = 'tr-cleaned',
	ManuallyTranslated = 'tr-manual',
	Unknown = 'unknown'
}

export enum ProcessingStatus {
	NotProcessed = 'not-proc',
	Processing = 'processing',
	Processed = 'processed'
}

export interface Text {
	uuid: string;
	lang: SupportedLanguage;
	raw: string;
	sent?: string;
	processed?: string;
	processingStatus?: ProcessingStatus;
	status: TextStatus;
}