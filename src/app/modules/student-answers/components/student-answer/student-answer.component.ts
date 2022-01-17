import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StudentAnswer } from '../../models/student-answer';
import { ShownStudentAnswerActions } from '../../state/actions';
import { selectShownStudentAnswer } from '../../state/selectors';

@Component({
	selector: 'app-student-answer',
	templateUrl: './student-answer.component.html',
	styleUrls: ['./student-answer.component.scss']
})
export class StudentAnswerComponent {

	subscriptions: Subscription[] = [];
	studentAnswer: StudentAnswer | null = null;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private store: Store
	) {
		this.initializeUuidSubscription();
		this.initializeStudentAnswerSubscription();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
			})
		);
	}

}
