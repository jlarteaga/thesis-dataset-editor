import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

export class AuthenticatedService {

	protected headers: HttpHeaders = new HttpHeaders();

	constructor(
		protected authService: AuthService
	) {
		this.setupAuthenticationSubscription();
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