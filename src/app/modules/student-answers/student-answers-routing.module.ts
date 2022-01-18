import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentAnswerComponent } from './components/student-answer/student-answer.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeComponent
	},
	{
		path: ':uuid',
		component: StudentAnswerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StudentAnswersRoutingModule {}
