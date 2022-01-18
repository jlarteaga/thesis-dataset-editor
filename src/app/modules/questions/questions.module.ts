import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
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
		SweetAlert2Module,
		MatDividerModule,
		MatExpansionModule,
		MatListModule,
		MatSelectModule,
		FormsModule
	]
})
export class QuestionsModule {}
