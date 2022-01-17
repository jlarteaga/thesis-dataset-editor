import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './components/home/home.component';
import { StudentAnswerComponent } from './components/student-answer/student-answer.component';
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
		EffectsModule.forFeature([StudentAnswersEffects])
	]
})
export class StudentAnswersModule {}
