import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LabeledDataComponent } from './components/labeled-data/labeled-data.component';

@NgModule({
	declarations: [
		LabeledDataComponent
	],
	exports: [
		LabeledDataComponent
	],
	imports: [
		CommonModule
	]
})
export class SharedModule {}
