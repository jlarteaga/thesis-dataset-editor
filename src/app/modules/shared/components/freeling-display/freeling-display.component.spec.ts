import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelingDisplayComponent } from './freeling-display.component';

describe('FreelingDisplayComponent', () => {
	let component: FreelingDisplayComponent;
	let fixture: ComponentFixture<FreelingDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [FreelingDisplayComponent]
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FreelingDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
