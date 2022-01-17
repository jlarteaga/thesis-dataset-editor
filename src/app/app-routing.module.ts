import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [AuthGuard],
		component: MainLayoutComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'questions',
				loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule)
			},
			{
				path: 'student-answers',
				redirectTo: '/home'
				// loadChildren: () => import('./modules/student-answers/student-answers.module').then(m => m.StudentAnswersModule)
			},
			{
				path: 'translations',
				loadChildren: () => import('./modules/translations/translations.module').then(m => m.TranslationsModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		paramsInheritanceStrategy: 'always'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule {}
