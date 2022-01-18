import { GetTextSummarizedDTO } from '../../texts/dtos/get-text-summarized.dto';
import { GetBaseStudentAnswerDTO } from './get-base-student-answer.dto';

export interface GetStudentAnswerSummarizedDTO extends GetBaseStudentAnswerDTO<GetTextSummarizedDTO> {
}