import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsEffects } from './state/effects/questions.effects';
import { questionsFeature } from './state/questions.feature';

@NgModule({
	declarations: [
		HomeComponent,
		QuestionComponent
	],
	imports: [
		CommonModule,
		QuestionsRoutingModule,
		StoreModule.forFeature(questionsFeature),
		EffectsModule.forFeature([QuestionsEffects]),
		MatProgressSpinnerModule
	]
})
export class QuestionsModule {}
