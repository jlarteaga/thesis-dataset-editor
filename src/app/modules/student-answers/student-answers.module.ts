import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
		MatProgressSpinnerModule,
		SharedModule,
		MatDividerModule,
		MatButtonModule
	]
})
export class StudentAnswersModule {}
