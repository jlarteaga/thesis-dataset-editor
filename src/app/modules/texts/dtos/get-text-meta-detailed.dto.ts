import { GetTextDetailedDTO } from './get-text-detailed.dto';

export interface GetTextMetaDetailedDto extends GetTextDetailedDTO {
	parent: string;
	parentType: string;
}