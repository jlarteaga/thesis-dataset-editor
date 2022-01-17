import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { AuthenticatedService } from '../../shared/services/authenticated-service';

@Injectable({
	providedIn: 'root'
})
export class ApiService extends AuthenticatedService {

	private datasetManagerUrl: string = environment.datasetManager.url;

	constructor(
		authService: AuthService,
		private httpClient: HttpClient
	) {
		super(authService);
	}

	get<T>(path: string): Observable<T> {
		return this.httpClient.get<T>(
			`${this.datasetManagerUrl}${path.startsWith('/') ? '' : '/'}${path}`,
			{
				headers: this.headers
			}
		);
	}

	patch<Body, T>(path: string, entity: Body) {
		return this.httpClient.patch<T>(
			`${this.datasetManagerUrl}${path.startsWith('/') ? '' : '/'}${path}`,
			entity,
			{
				headers: this.headers
			}
		);
	}
}
