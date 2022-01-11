import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401 || error.status === 403) {
					this.authService.logout();
					return EMPTY;
				}
				return throwError(error);
			})
		);
	}

}