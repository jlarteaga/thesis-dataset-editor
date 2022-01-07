import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/questions',
		pathMatch: 'full'
	},
	{
		path: 'questions',
		canActivate: [AuthGuard],
		loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
