import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { NgrxFeatures } from '../../utils/ngrx-features';
import { HomeComponent } from './components/home/home.component';
import { reducers } from './reducers';

import { StudentAnswersRoutingModule } from './student-answers-routing.module';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		StoreModule.forFeature(NgrxFeatures.StudentAnswer, reducers, {}),
		StudentAnswersRoutingModule
	]
})
export class StudentAnswersModule {}
