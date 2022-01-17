import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FreelingDisplayComponent } from './components/freeling-display/freeling-display.component';
import { GraphvizDisplayComponent } from './components/graphviz-display/graphviz-display.component';
import { LabeledDataComponent } from './components/labeled-data/labeled-data.component';
import { TextStatusComponent } from './components/text-status/text-status.component';
import { DepNodeToDotPipe } from './pipes/dep-node-to-dot.pipe';

@NgModule({
	declarations: [
		LabeledDataComponent,
		TextStatusComponent,
		FreelingDisplayComponent,
		GraphvizDisplayComponent,
  DepNodeToDotPipe
	],
	exports: [
		LabeledDataComponent,
		TextStatusComponent,
		FreelingDisplayComponent
	],
	imports: [
		CommonModule,
		MatCardModule,
		MatDividerModule
	]
})
export class SharedModule {}
