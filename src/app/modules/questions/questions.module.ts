import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';

import { QuestionsRoutingModule } from './questions-routing.module';
import { CoordinatorEffects } from './state/effects/coordinator.effects';
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
		EffectsModule.forFeature([
			QuestionsEffects,
			CoordinatorEffects
		]),
		MatProgressSpinnerModule,
		SharedModule,
		MatButtonModule,
		SweetAlert2Module
	]
})
export class QuestionsModule {}
