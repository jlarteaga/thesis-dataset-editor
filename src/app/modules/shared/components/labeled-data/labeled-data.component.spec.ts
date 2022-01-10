import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeledDataComponent } from './labeled-data.component';

describe('LabeledDataComponent', () => {
	let component: LabeledDataComponent;
	let fixture: ComponentFixture<LabeledDataComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [LabeledDataComponent]
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LabeledDataComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
