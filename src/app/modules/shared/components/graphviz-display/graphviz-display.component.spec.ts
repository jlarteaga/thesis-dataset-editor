import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphvizDisplayComponent } from './graphviz-display.component';

describe('GraphvizDisplayComponent', () => {
	let component: GraphvizDisplayComponent;
	let fixture: ComponentFixture<GraphvizDisplayComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
				declarations: [GraphvizDisplayComponent]
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GraphvizDisplayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
