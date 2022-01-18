import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from './user.model';

export interface AuthResponse {
	email: string;
	uuid: string;
	token: string;
	expiresIn: number;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	user = new BehaviorSubject<User | null>(null);
	private tokenExpirationTimer: any;

	constructor(
		private http: HttpClient,
		private router: Router
	) {
	}

	private static handleError(errorRes: HttpErrorResponse) {
		let errorMessage = 'An unknown error occurred!';
		if (!errorRes.error || !errorRes.error.statusCode) {
			return throwError(errorMessage);
		}
		switch (errorRes.error.statusCode) {
			case 401:
				errorMessage = 'Wrong credentials';
				break;
		}
		return throwError(errorMessage);
	}

	login(email: string, password: string) {
		return this.http.post<AuthResponse>(
			`${environment.datasetManager.url}/auth/login`,
			{
				email,
				password
			}).pipe(
			catchError(AuthService.handleError),
			tap((response) => {
				this.handleAuthentication(
					response.email,
					response.uuid,
					response.token,
					response.expiresIn * 1000
				);
			})
		);
	}

	autoLogin() {
		const storedUserData = localStorage.getItem('userData');
		if (!storedUserData) {
			return;
		}
		const userData: {
			email: string;
			uuid: string;
			_token: string;
			_tokenExpirationDate: string;
		} = JSON.parse(storedUserData);

		const loadedUser = new User(
			userData.email,
			userData.uuid,
			userData._token,
			new Date(userData._tokenExpirationDate)
		);

		if (loadedUser.token) {
			this.user.next(loadedUser);
			const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
			this.autoLogout(expirationDuration);
		}
	}

	logout() {
		this.user.next(null);
		this.router.navigate(['/auth']);
		localStorage.removeItem('userData');
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
	}

	autoLogout(expirationDuration: number) {
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout();
		}, expirationDuration);
	}

	private handleAuthentication(
		email: string,
		userId: string,
		token: string,
		expiresIn: number
	) {
		const expirationDate = new Date(new Date().getTime() + expiresIn);
		const user = new User(email, userId, token, expirationDate);
		this.user.next(user);
		this.autoLogout(expiresIn);
		localStorage.setItem('userData', JSON.stringify(user));
	}
}
