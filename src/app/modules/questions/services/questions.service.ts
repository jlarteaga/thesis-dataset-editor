import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../dataset-manager/services/api.service';
import { GetAllQuestionDTO } from '../models/question';

@Injectable({
	providedIn: 'root'
})
export class QuestionsService {

	constructor(
		private apiService: ApiService
	) {
	}

	getAll(): Observable<GetAllQuestionDTO[]> {
		return this.apiService.get<GetAllQuestionDTO[]>('/questions');
	}

}
