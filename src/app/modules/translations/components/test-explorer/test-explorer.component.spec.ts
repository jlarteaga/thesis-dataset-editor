import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExplorerComponent } from './test-explorer.component';

describe('TestExplorerComponent', () => {
	let component: TestExplorerComponent;
	let fixture: ComponentFixture<TestExplorerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [TestExplorerComponent]
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestExplorerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
