import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTreeModule } from '@angular/material/tree';
import { HomeComponent } from './components/home/home.component';
import { TestExplorerComponent } from './components/test-explorer/test-explorer.component';
import { TranslateQuestionComponent } from './components/translate-question/translate-question.component';
import { TranslateStudentAnswerComponent } from './components/translate-student-answer/translate-student-answer.component';

import { TranslationsRoutingModule } from './translations-routing.module';

@NgModule({
	declarations: [
		HomeComponent,
		TestExplorerComponent,
		TranslateQuestionComponent,
		TranslateStudentAnswerComponent
	],
	imports: [
		CommonModule,
		TranslationsRoutingModule,
		MatTreeModule,
		MatIconModule,
		MatButtonModule,
		MatProgressBarModule,
		MatListModule
	]
})
export class TranslationsModule {}
