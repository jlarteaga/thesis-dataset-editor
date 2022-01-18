import { SupportedLanguage } from '../../../utils/global-types';
import { GetTextDetailedDTO } from '../../texts/dtos/get-text-detailed.dto';

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

export enum AvailableLanguage {
	Es = 'es',
	En = 'en'
}

export class Text {
	uuid: string;
	lang: SupportedLanguage;
	raw: string;
	sent?: string;
	processed?: string | null;
	processingStatus?: ProcessingStatus;
	status: TextStatus;

	public static fromDetailedDTO(getTextDetailedDTO: GetTextDetailedDTO): Text {
		return {
			uuid: getTextDetailedDTO.uuid,
			lang: getTextDetailedDTO.lang,
			raw: getTextDetailedDTO.raw,
			sent: getTextDetailedDTO.sent,
			processed: getTextDetailedDTO.processed,
			processingStatus: getTextDetailedDTO.processingStatus,
			status: getTextDetailedDTO.status
		};
	}

	constructor(text: Text) {
		this.uuid = text.uuid;
		this.lang = text.lang;
		this.raw = text.raw;
		this.sent = text.sent;
		this.processed = text.processed;
		this.processingStatus = text.processingStatus;
		this.status = text.status;
	}
}