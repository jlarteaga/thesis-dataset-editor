import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		HttpClientModule,
		AuthModule
	]
})
export class DatasetManagerModule {}
