import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../dataset-manager/services/api.service';
import { GetAllStudentAnswerDTO } from '../dtos/get-all-student-answer.dto';
import { GetStudentAnswerDTO } from '../dtos/get-student-answer.dto';
import { PatchStudentAnswerDTO } from '../dtos/patch-student-answer.dto';

@Injectable({
	providedIn: 'root'
})
export class StudentAnswersService {

	constructor(
		private apiService: ApiService
	) {
	}

	getAllByQuestionUuid(questionUuid: string | undefined): Observable<GetAllStudentAnswerDTO[]> {
		if (!questionUuid) {
			return of([]);
		}
		return this.apiService.get<GetAllStudentAnswerDTO[]>(`/questions/${questionUuid}/student-answers`);
	}

	updateById(uuid: string, patch: PatchStudentAnswerDTO): Observable<GetStudentAnswerDTO> {
		return this.apiService.patch<PatchStudentAnswerDTO, GetStudentAnswerDTO>(`student-answers/${uuid}`, patch);
	}

	getById(uuid: string): Observable<GetStudentAnswerDTO> {
		return this.apiService.get<GetStudentAnswerDTO>(`student-answers/${uuid}`);
	}
}
