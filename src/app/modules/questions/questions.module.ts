import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

import { QuestionsRoutingModule } from './questions-routing.module';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		QuestionsRoutingModule
	]
})
export class QuestionsModule {}
