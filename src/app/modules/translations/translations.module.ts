import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTreeModule } from '@angular/material/tree';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './components/home/home.component';
import { TestExplorerComponent } from './components/test-explorer/test-explorer.component';
import { TranslateQuestionComponent } from './components/translate-question/translate-question.component';
import { TranslateStudentAnswerComponent } from './components/translate-student-answer/translate-student-answer.component';
import { TranslationNodesEffects } from './state/effects/translation-nodes.effects';
import { translationsFeature } from './state/translations.feature';

import { TranslationsRoutingModule } from './translations-routing.module';

@NgModule({
	declarations: [
		HomeComponent,
		TestExplorerComponent,
		TranslateQuestionComponent,
		TranslateStudentAnswerComponent
	],
	imports: [
		CommonModule,
		TranslationsRoutingModule,
		MatTreeModule,
		MatIconModule,
		MatButtonModule,
		MatProgressBarModule,
		MatListModule,
		MatCardModule,
		StoreModule.forFeature(translationsFeature),
		EffectsModule.forFeature([TranslationNodesEffects])
	]
})
export class TranslationsModule {}
