import { TestBed } from '@angular/core/testing';

import { QuestionsService } from './questions.service';

describe('QuestionService', () => {
	let service: QuestionsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(QuestionsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
