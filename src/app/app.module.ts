import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthModule } from './modules/auth/auth.module';
import { metaReducers, reducers } from './reducers';

@NgModule({
	declarations: [
		AppComponent,
		MainLayoutComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatIconModule,
		MatSidenavModule,
		MatButtonModule,
		MatDividerModule,
		SweetAlert2Module.forRoot(),
		StoreModule.forRoot(reducers, {
			metaReducers
		}),
		EffectsModule.forRoot([AppEffects])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
