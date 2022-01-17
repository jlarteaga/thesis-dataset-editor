import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsEffects } from './state/effects/questions.effects';

@NgModule({
	declarations: [
		HomeComponent,
		QuestionComponent
	],
	imports: [
		CommonModule,
		QuestionsRoutingModule,
		EffectsModule.forFeature([QuestionsEffects])
	]
})
export class QuestionsModule {}
