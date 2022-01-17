import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LabeledDataComponent } from './components/labeled-data/labeled-data.component';
import { TextStatusComponent } from './components/text-status/text-status.component';

@NgModule({
	declarations: [
		LabeledDataComponent,
		TextStatusComponent
	],
	exports: [
		LabeledDataComponent,
		TextStatusComponent
	],
	imports: [
		CommonModule
	]
})
export class SharedModule {}
