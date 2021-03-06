import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewInit, OnDestroy {
	@ViewChild(MatSidenav)
	sidenav!: MatSidenav;
	subscriptions: Subscription[] = [];

	constructor(
		private observer: BreakpointObserver,
		private authService: AuthService
	) {
	}

	ngAfterViewInit(): void {
		this.subscriptions.push(
			this.observer.observe(['(max-width: 1250px)']).subscribe((res) => {
				setTimeout(() => {
					if (res.matches) {
						this.sidenav.mode = 'over';
						this.sidenav.close();
					} else {
						this.sidenav.mode = 'side';
						this.sidenav.open();
					}
				}, 0);
			})
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	processSidenavClick() {
		if (this.sidenav.mode === 'over') {
			this.sidenav.close();
		}
	}

	logout() {
		this.authService.logout();
	}
}
