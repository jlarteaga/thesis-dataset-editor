import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		AuthRoutingModule,
		CommonModule,
		HttpClientModule,
		MatButtonModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule
	]
})
export class AuthModule {}
