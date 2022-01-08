import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgrxFeatures } from '../../utils/ngrx-features';
import { QuestionsModule } from '../questions/questions.module';
import { StudentAnswersModule } from '../student-answers/student-answers.module';
import { HomeComponent } from './components/home/home.component';
import { reducers } from './reducers';

import { TranslationsRoutingModule } from './translations-routing.module';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		QuestionsModule,
		StudentAnswersModule,
		TranslationsRoutingModule,
		EffectsModule.forFeature(),
		StoreModule.forFeature(NgrxFeatures.Translation, reducers, {})
	]
})
export class TranslationsModule {}
