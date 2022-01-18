import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FreelingDisplayComponent } from './components/freeling-display/freeling-display.component';
import { GraphvizDisplayComponent } from './components/graphviz-display/graphviz-display.component';
import { LabeledDataComponent } from './components/labeled-data/labeled-data.component';
import { SimilarityMatricesDisplayComponent } from './components/similarity-matrices-display/similarity-matrices-display.component';
import { TextStatusComponent } from './components/text-status/text-status.component';
import { DepNodeToDotPipe } from './pipes/dep-node-to-dot.pipe';

@NgModule({
	declarations: [
		LabeledDataComponent,
		TextStatusComponent,
		FreelingDisplayComponent,
		GraphvizDisplayComponent,
		DepNodeToDotPipe,
		SimilarityMatricesDisplayComponent
	],
	exports: [
		LabeledDataComponent,
		TextStatusComponent,
		FreelingDisplayComponent,
		SimilarityMatricesDisplayComponent
	],
	imports: [
		CommonModule,
		MatCardModule,
		MatDividerModule,
		MatTabsModule,
		MatExpansionModule
	]
})
export class SharedModule {}
