import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../dataset-manager/services/api.service';
import { GetStudentAnswerDetailedDTO } from '../dtos/get-student-answer-detailed.dto';
import { GetStudentAnswerSummarizedDTO } from '../dtos/get-student-answer-summarized.dto';
import { PatchStudentAnswerDTO } from '../dtos/patch-student-answer.dto';

@Injectable({
	providedIn: 'root'
})
export class StudentAnswersService {

	constructor(
		private apiService: ApiService
	) {
	}

	getAllByQuestionUuid(questionUuid: string | undefined): Observable<GetStudentAnswerSummarizedDTO[]> {
		if (!questionUuid) {
			return of([]);
		}
		return this.apiService.get<GetStudentAnswerSummarizedDTO[]>(`/questions/${questionUuid}/student-answers`);
	}

	updateById(uuid: string, patch: PatchStudentAnswerDTO): Observable<GetStudentAnswerDetailedDTO> {
		return this.apiService.patch<PatchStudentAnswerDTO, GetStudentAnswerDetailedDTO>(`student-answers/${uuid}`, patch);
	}

	getById(uuid: string): Observable<GetStudentAnswerDetailedDTO> {
		return this.apiService.get<GetStudentAnswerDetailedDTO>(`student-answers/${uuid}`);
	}
}
