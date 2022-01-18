import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Observable, Subscription, tap } from 'rxjs';
import { StudentAnswer } from '../../models/student-answer';
import { ProcessingStatus, TextStatus } from '../../models/text';
import { ShownStudentAnswerActions } from '../../state/actions';
import { selectSendingTextProcessRequest, selectShownStudentAnswer } from '../../state/selectors';

@Component({
	selector: 'app-student-answer',
	templateUrl: './student-answer.component.html',
	styleUrls: ['./student-answer.component.scss']
})
export class StudentAnswerComponent {

	readonly TextStatus = TextStatus;
	readonly ProcessingStatus = ProcessingStatus;

	subscriptions: Subscription[] = [];
	studentAnswer: StudentAnswer | null = null;
	sendingProcessingRequest$: Observable<boolean>;
	refreshingSubscription: Subscription | null = null;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private store: Store
	) {
		this.sendingProcessingRequest$ = store.select(selectSendingTextProcessRequest);
		this.initializeUuidSubscription();
		this.initializeStudentAnswerSubscription();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
		this.cleanRefreshingSubscription();
	}

	processStudentAnswer() {
		if (this.studentAnswer && this.studentAnswer.uuid) {
			this.store.dispatch(ShownStudentAnswerActions.requestTextProcessingForStudentAnswer({
				uuid: this.studentAnswer.uuid
			}));
		} else {
			console.warn('Can\'t process student-answer without an uuid');
		}
	}

	private changeUuid(uuid: string | null) {
		if (uuid === null) {
			this.router.navigate(['/']);
			return;
		}
		this.store.dispatch(ShownStudentAnswerActions.loadShownStudentAnswer({
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

	private initializeStudentAnswerSubscription() {
		this.subscriptions.push(
			this.store.select(selectShownStudentAnswer).subscribe(studentAnswer => {
				this.studentAnswer = studentAnswer;
				this.updateRefreshingBehaviour();
			})
		);
	}

	private updateRefreshingBehaviour() {
		// TODO: include matrix-similarity processing
		if (!this.studentAnswer?.text.processingStatus) {
			this.cleanRefreshingSubscription();
			return;
		}
		if (
			this.studentAnswer.text.processingStatus === ProcessingStatus.Processing ||
			this.studentAnswer.similarityMatricesStatus !== ProcessingStatus.Processed
		) {
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
					if (this.studentAnswer?.uuid) {
						this.store.dispatch(ShownStudentAnswerActions.updateShownStudentAnswer({
							uuid: this.studentAnswer.uuid
						}));
					}
				})
			).subscribe();
	}
}