import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAnswerComponent } from './student-answer.component';

describe('StudentAnswerComponent', () => {
	let component: StudentAnswerComponent;
	let fixture: ComponentFixture<StudentAnswerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [StudentAnswerComponent]
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(StudentAnswerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
