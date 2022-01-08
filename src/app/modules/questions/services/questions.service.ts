import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { GetAllQuestionDTO } from '../models/question';

@Injectable({
	providedIn: 'root'
})
export class QuestionsService {

	private datasetManagerUrl: string = environment.datasetManager.url;
	private token: string = '';

	constructor(
		private httpClient: HttpClient,
		private authService: AuthService
	) {
		this.authService.user.subscribe(user => {
			this.token = (user && user.token ? user.token : '');
		});
	}

	getAll(): Observable<GetAllQuestionDTO[]> {
		return this.authService.user.pipe(
			take(1),
			map(user => user?.token || null),
			switchMap(token =>
				this.httpClient.get<GetAllQuestionDTO[]>(`${this.datasetManagerUrl}/questions`, {
					headers: new HttpHeaders({
						Authentication: `Bearer ${token}`
					})
				})
			)
		);
	}
}
