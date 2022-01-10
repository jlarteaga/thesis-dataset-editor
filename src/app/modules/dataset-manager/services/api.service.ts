import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private headers: HttpHeaders = new HttpHeaders();

	private datasetManagerUrl: string = environment.datasetManager.url;

	constructor(
		private httpClient: HttpClient,
		private authService: AuthService
	) {
		this.setupAuthenticationSubscription();
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

	private setupAuthenticationSubscription() {
		this.authService.user.pipe(
			map(user => user?.token || null)
		).subscribe(token => {
			if (token) {
				this.headers = this.headers.set('Authorization', `Bearer ${token}`);
			} else {
				this.headers = this.headers.delete('Authorization');
			}
		});
	}
}
