import { createSelector } from '@ngrx/store';
import { Question } from '../../../modules/questions/models/question';
import { StudentAnswer } from '../../../modules/student-answers/models/student-answer';
import { selectAllQuestions } from '../question.selectors';

const labelRegex = /(\d+)\.(\d+)/;

export interface TranslationNode {
	test: number;
	questionNumber?: number;
	studentIdx?: number;
	name: string;
	question?: {
		es?: Question;
		en?: Question;
	};
	studentAnswer?: {
		es?: StudentAnswer,
		en?: StudentAnswer
	};
	children: TranslationNode[];
}

export const selectTranslationNodes = createSelector(
	selectAllQuestions,
	(questions: Question[]) => {
		const map = new Map<number, TranslationNode>();
		questions.forEach(question => {
			const results = labelRegex.exec(question.label);
			if (results === null) {
				return;
			}
			const examId = parseInt(results[1], 10);
			const questionId = parseInt(results[2], 10);
			if (!map.has(examId)) {
				map.set(examId, {
					test: examId,
					name: `Test ${examId}`,
					children: []
				});
			}
			const foundNode = map.get(examId)?.children.find(node => node.questionNumber === questionId);
			if (foundNode) {
				foundNode.question = foundNode.question = {
					...foundNode.question,
					[question.lang]: question
				};
			} else {
				map.get(examId)?.children?.push({
					name: `Question ${questionId}`,
					question: {
						[question.lang]: question
					},
					children: [],
					questionNumber: questionId,
					test: examId
				});
			}
		});
		const result: TranslationNode[] = [];
		map.forEach((translationNode) => {
			result.push(translationNode);
			translationNode.children.sort((translationNode1, translationNode2) => {
				return (translationNode1.test - translationNode2.test) ||
					((translationNode1.questionNumber || 0) - (translationNode2.questionNumber || 0));
			});
		});
		result.sort((node1, node2) => node1.test - node2.test);
		return result;
	}
);