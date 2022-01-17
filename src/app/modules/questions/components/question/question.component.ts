import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Question } from '../../models/question';
import { ShownQuestionActions } from '../../state/actions';
import { selectShownQuestion } from '../../state/selectors';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnDestroy {

	subscriptions: Subscription[] = [];
	question: Question | null = null;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private store: Store
	) {
		this.initializeUuidSubscription();
		this.initializeQuestionSubscription();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	private changeUuid(uuid: string | null) {
		if (uuid === null) {
			this.router.navigate(['/']);
			return;
		}
		this.store.dispatch(ShownQuestionActions.loadShownQuestion({
			uuid
		}));
	}

	private initializeUuidSubscription() {
		this.subscriptions.push(
			this.route.paramMap.subscribe(paramMap => {
				this.changeUuid(paramMap.get('uuid'));
			})
		);
	}

	private initializeQuestionSubscription() {
		this.subscriptions.push(
			this.store.select(selectShownQuestion).subscribe(question => {
				this.question = question;
			})
		);
	}
}
