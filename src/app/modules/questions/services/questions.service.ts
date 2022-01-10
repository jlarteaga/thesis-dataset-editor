import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../dataset-manager/services/api.service';
import { GetAllQuestionDTO } from '../dtos/get-all-question.dto';
import { GetQuestionDTO } from '../dtos/get-question.dto';
import { PatchQuestionDto } from '../dtos/patch-question.dto';

export interface PatchResponseDTO {
	message: string;
}

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

	updateById(uuid: string, patch: PatchQuestionDto): Observable<PatchResponseDTO> {
		return this.apiService.patch<PatchQuestionDto, PatchResponseDTO>(`/questions/${uuid}`, patch);
	}

	getById(uuid: string): Observable<GetQuestionDTO> {
		return this.apiService.get<GetQuestionDTO>(`questions/${uuid}`);
	}
}
