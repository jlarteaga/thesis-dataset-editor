import { GetTextDetailedDTO } from '../../texts/dtos/get-text-detailed.dto';
import { GetBaseStudentAnswerDTO } from './get-base-student-answer.dto';
import { SimilarityMatricesDTO } from './similarity-matrices.dto';

export interface GetStudentAnswerDetailedDTO extends GetBaseStudentAnswerDTO<GetTextDetailedDTO> {
	similarityMatrices: SimilarityMatricesDTO;
}