import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateStudentAnswerComponent } from './translate-student-answer.component';

describe('TranslateStudentAnswerComponent', () => {
	let component: TranslateStudentAnswerComponent;
	let fixture: ComponentFixture<TranslateStudentAnswerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [TranslateStudentAnswerComponent]
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TranslateStudentAnswerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
