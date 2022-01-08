import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgrxFeatures } from '../../utils/ngrx-features';
import { HomeComponent } from './components/home/home.component';
import { QuestionEffects } from './question.effects';

import { QuestionsRoutingModule } from './questions-routing.module';
import { reducers } from './reducers';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		StoreModule.forFeature(NgrxFeatures.Question, reducers, {}),
		EffectsModule.forFeature([QuestionEffects]),
		QuestionsRoutingModule
	]
})
export class QuestionsModule {}
