import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { AuthenticatedService } from './authenticated-service';

export interface OperationResponse {
	success: boolean;
	message: string;
}

@Injectable({
	providedIn: 'root'
})
export class CoordinatorService extends AuthenticatedService {

	private coordinatorUrl: string = environment.coordinator.url;

	constructor(
		authService: AuthService,
		private httpClient: HttpClient
	) {
		super(authService);
	}

	requestProcessingForText(uuid: string): Observable<OperationResponse> {
		return this.httpClient.get<OperationResponse>(
			`${this.coordinatorUrl}/operations/process-text/texts/${uuid}`,
			{
				headers: this.headers
			}
		);
	}
}
