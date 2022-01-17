import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './components/home/home.component';

import { StudentAnswersRoutingModule } from './student-answers-routing.module';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		StudentAnswersRoutingModule,
		EffectsModule.forFeature([])
	]
})
export class StudentAnswersModule {}
