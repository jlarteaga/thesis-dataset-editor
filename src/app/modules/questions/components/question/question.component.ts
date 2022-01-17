import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Observable, Subscription, tap } from 'rxjs';
import { ProcessingStatus } from '../../../student-answers/models/text';
import { Question } from '../../models/question';
import { ShownQuestionActions } from '../../state/actions';
import { selectSendingTextProcessRequest, selectShownQuestion } from '../../state/selectors';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnDestroy {

	readonly ProcessingStatus = ProcessingStatus;

	subscriptions: Subscription[] = [];
	question: Question | null = null;
	sendingProcessingRequest$: Observable<boolean>;
	refreshingSubscription: Subscription | null = null;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private store: Store
	) {
		this.sendingProcessingRequest$ = store.select(selectSendingTextProcessRequest);
		this.initializeUuidSubscription();
		this.initializeQuestionSubscription();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
		this.cleanRefreshingSubscription();
	}

	processAnswer() {
		if (this.question && this.question.uuid) {
			this.store.dispatch(ShownQuestionActions.requestTextProcessingForQuestion({
				uuid: this.question.uuid
			}));
		} else {
			console.warn('Can\'t process answer without an uuid');
		}
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
				this.updateRefreshingBehavior();
			})
		);
	}

	private updateRefreshingBehavior() {
		if (!this.question?.answer?.processingStatus) {
			this.cleanRefreshingSubscription();
			return;
		}
		if (this.question.answer.processingStatus === ProcessingStatus.Processing) {
			this.initializeRefreshingSubscription();
		} else {
			this.cleanRefreshingSubscription();
		}
	}

	private cleanRefreshingSubscription() {
		if (this.refreshingSubscription) {
			this.refreshingSubscription.unsubscribe();
			this.refreshingSubscription = null;
		}
	}

	private initializeRefreshingSubscription() {
		if (this.refreshingSubscription) {
			this.cleanRefreshingSubscription();
		}
		this.refreshingSubscription = interval(1500)
			.pipe(
				tap(() => {
					if (this.question?.uuid) {
						this.store.dispatch(ShownQuestionActions.updateShownQuestion({
							uuid: this.question.uuid
						}));
					}
				})
			).subscribe();
	}
}
