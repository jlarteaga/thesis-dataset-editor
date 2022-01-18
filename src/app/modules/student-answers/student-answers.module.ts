import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { QuestionsModule } from '../questions/questions.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { StudentAnswerComponent } from './components/student-answer/student-answer.component';
import { CoordinatorEffects } from './state/effects/coordinator.effects';
import { StudentAnswersEffects } from './state/effects/student-answers.effects';
import { studentAnswersFeature } from './state/student-answers.feature';

import { StudentAnswersRoutingModule } from './student-answers-routing.module';

@NgModule({
	declarations: [
		HomeComponent,
		StudentAnswerComponent
	],
	imports: [
		CommonModule,
		StudentAnswersRoutingModule,
		StoreModule.forFeature(studentAnswersFeature),
		EffectsModule.forFeature([
			StudentAnswersEffects,
			CoordinatorEffects
		]),
		QuestionsModule,
		MatProgressSpinnerModule,
		SharedModule,
		MatDividerModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		MatExpansionModule,
		MatListModule
	]
})
export class StudentAnswersModule {}
