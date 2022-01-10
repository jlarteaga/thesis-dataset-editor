import { TestBed } from '@angular/core/testing';

import { StudentAnswersService } from './student-answers.service';

describe('StudentAnswersService', () => {
	let service: StudentAnswersService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(StudentAnswersService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
