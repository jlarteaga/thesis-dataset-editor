import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TranslateQuestionComponent } from './components/translate-question/translate-question.component';
import { TranslateStudentAnswerComponent } from './components/translate-student-answer/translate-student-answer.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'questions/1.1'
	},
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'questions/:questionLabel',
				component: TranslateQuestionComponent
			},
			{
				path: 'questions/:questionLabel/student-answers/:studentAnswerIndex',
				component: TranslateStudentAnswerComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TranslationsRoutingModule {}
