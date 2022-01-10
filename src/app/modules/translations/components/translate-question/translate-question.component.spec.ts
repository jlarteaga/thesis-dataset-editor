import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateQuestionComponent } from './translate-question.component';

describe('TranslateQuestionComponent', () => {
	let component: TranslateQuestionComponent;
	let fixture: ComponentFixture<TranslateQuestionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [TranslateQuestionComponent]
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TranslateQuestionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
