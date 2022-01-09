import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../dataset-manager/services/api.service';
import { GetAllStudentAnswerDTO } from '../dtos/get-all-student-answer.dto';

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
}
