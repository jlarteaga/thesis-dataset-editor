import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
