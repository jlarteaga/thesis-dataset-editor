import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { NonAuthGuard } from './non-auth.guard';

const routes: Routes = [
	{
		path: 'auth',
		canActivate: [NonAuthGuard],
		component: LoginComponent
	}
];

@NgModule({
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useFactory: (authService: AuthService) => new AuthInterceptor(authService),
			multi: true,
			deps: [AuthService]
		}
	],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
