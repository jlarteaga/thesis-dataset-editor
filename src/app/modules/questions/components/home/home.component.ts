import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ResourceStatus } from '../../../../state/global.state';
import { AvailableLanguage } from '../../../student-answers/models/text';
import { ShownQuestionsActions } from '../../state/actions';
import { AvailableTests, selectAvailableTests, selectShownQuestionsStatus } from '../../state/selectors';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
	readonly ResourceStatus = ResourceStatus;
	readonly AvailableLanguage = AvailableLanguage;
	shownQuestionsStatus: ResourceStatus = ResourceStatus.NotLoaded;
	availableTests: AvailableTests | null = null;
	lang: AvailableLanguage = AvailableLanguage.Es;
	private subscriptions: Subscription[] = [];

	constructor(
		private store: Store
	) {
		this.store.dispatch(ShownQuestionsActions.updateShownQuestions());
		this.initializeShownQuestionsSubscriptions();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	private initializeShownQuestionsSubscriptions() {
		this.subscriptions.push(
			this.store.select(selectShownQuestionsStatus)
				.subscribe(shownQuestionsStatus => {
					this.shownQuestionsStatus = shownQuestionsStatus;
				})
		);
		this.subscriptions.push(
			this.store.select(selectAvailableTests)
				.subscribe((availableTests: AvailableTests | null) => {
					this.availableTests = availableTests;
				})
		);
	}

}
