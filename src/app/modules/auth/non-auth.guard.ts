import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authService.user.pipe(
			take(1),
			map(user => {
				const isAuthorized = !!user;
				if (!isAuthorized) {
					return true;
				}
				return this.router.createUrlTree(['/home']);
			})
		);
	}

}
