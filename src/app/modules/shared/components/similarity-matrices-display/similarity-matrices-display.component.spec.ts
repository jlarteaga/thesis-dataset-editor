import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarityMatricesDisplayComponent } from './similarity-matrices-display.component';

describe('SimilarityMatricesDisplayComponent', () => {
	let component: SimilarityMatricesDisplayComponent;
	let fixture: ComponentFixture<SimilarityMatricesDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [SimilarityMatricesDisplayComponent]
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SimilarityMatricesDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
