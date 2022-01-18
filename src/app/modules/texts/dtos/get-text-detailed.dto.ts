import { GetTextBaseDTO } from './get-text-base.dto';

export interface GetTextDetailedDTO extends GetTextBaseDTO {
	processed: string | null;
}