import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	isProcessing = false;
	loginForm: FormGroup;
	errorMessage: string = '';

	constructor(
		private authService: AuthService,
		private router: Router,
		formBuilder: FormBuilder
	) {
		this.loginForm = formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	ngOnInit(): void {
	}

	processLogin() {
		const {
			email,
			password
		} = this.loginForm.value;
		this.isProcessing = true;
		this.loginForm.disable();
		this.errorMessage = '';
		this.authService.login(email, password)
			.subscribe(() => {
				this.isProcessing = false;
				this.router.navigate(['/questions']);
				this.loginForm.enable();
			}, (errorMessage) => {
				this.isProcessing = false;
				this.errorMessage = errorMessage;
				this.loginForm.enable();
			});
	}
}
