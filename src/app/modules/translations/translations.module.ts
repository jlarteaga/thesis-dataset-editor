import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { HomeComponent } from './components/home/home.component';
import { TestExplorerComponent } from './components/test-explorer/test-explorer.component';

import { TranslationsRoutingModule } from './translations-routing.module';

@NgModule({
	declarations: [
		HomeComponent,
		TestExplorerComponent
	],
	imports: [
		CommonModule,
		TranslationsRoutingModule,
		MatTreeModule,
		MatIconModule,
		MatButtonModule
	]
})
export class TranslationsModule {}
