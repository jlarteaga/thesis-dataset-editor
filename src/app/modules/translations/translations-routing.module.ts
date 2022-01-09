import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TranslateQuestionComponent } from './components/translate-question/translate-question.component';
import { TranslateStudentAnswerComponent } from './components/translate-student-answer/translate-student-answer.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'questions/:label',
				component: TranslateQuestionComponent
			},
			{
				path: 'questions/:label/student-answers/:number',
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
