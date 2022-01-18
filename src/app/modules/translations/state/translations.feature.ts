import { createFeature, createReducer, on } from '@ngrx/store';
import { ResourceStatus } from '../../../state/global.state';
import { Question } from '../../questions/models/question';
import { StudentAnswer } from '../../student-answers/models/student-answer';
import { TranslationNodesActions } from './actions';
import { QuestionTranslationNode, StudentAnswerTranslationNode, translationsInitialState, TranslationsState } from './translations.state';

export const TRANSLATIONS_FEATURE_NAME = 'translations';

const findQuestionTranslationNodeIdx = (
	nodeToFind: QuestionTranslationNode,
	nodes: QuestionTranslationNode[]
) => {
	return nodes.findIndex(node => node.label === nodeToFind.label);
};

export const translationsFeature = createFeature({
	name: TRANSLATIONS_FEATURE_NAME,
	reducer: createReducer<TranslationsState>(
		translationsInitialState,
		on(TranslationNodesActions.loadQuestionTranslationNodes, (state) => ({
			...state,
			translationNodesStatus: ResourceStatus.Loading
		})),
		on(TranslationNodesActions.setQuestionTranslationNodes, (state, { translationNodes }) => ({
			...state,
			translationNodes,
			translationNodesStatus: ResourceStatus.Loaded
		})),
		on(TranslationNodesActions.loadStudentAnswerNodes, ({ translationNodes, ...state }: TranslationsState, { parentNode }) => {
			const translationNodesCopy: QuestionTranslationNode[] = translationNodes.slice();
			const index = findQuestionTranslationNodeIdx(parentNode, translationNodesCopy);
			if (index > -1) {
				const newTranslationNode = translationNodesCopy[index];
				translationNodesCopy.splice(index, 1, {
					...newTranslationNode,
					isLoading: true
				});
			}
			return {
				...state,
				translationNodes: translationNodesCopy
			};
		}),
		on(TranslationNodesActions.setStudentAnswerNodes, ({ translationNodes, ...state }: TranslationsState, { parentNode, nodes }) => {
			const translationNodesCopy: QuestionTranslationNode[] = translationNodes.slice();
			const index = findQuestionTranslationNodeIdx(parentNode, translationNodesCopy);
			if (index > -1) {
				const newTranslationNode = {
					...translationNodesCopy[index],
					children: nodes,
					isLoading: false
				};
				translationNodesCopy.splice(index, 1, newTranslationNode);
			}
			return {
				...state,
				translationNodes: translationNodesCopy
			};
		}),
		on(TranslationNodesActions.unloadStudentAnswerNodes, ({ translationNodes, ...state }: TranslationsState, { parentNode }) => {
			const translationNodesCopy: QuestionTranslationNode[] = translationNodes.slice();
			const index = findQuestionTranslationNodeIdx(parentNode, translationNodesCopy);
			if (index > -1) {
				const newTranslationNode = {
					...translationNodesCopy[index],
					children: [],
					isLoading: false
				};
				translationNodesCopy.splice(index, 1, newTranslationNode);
			}
			return {
				...state,
				translationNodes: translationNodesCopy
			};
		}),
		on(TranslationNodesActions.patchQuestion, (state: TranslationsState, {}) => {
			return {
				...state,
				updatingQuestionTranslation: true
			};
		}),
		on(TranslationNodesActions.questionPatched, ({ translationNodes, ...state }: TranslationsState, { question }) => {
			const translationNodesCopy: QuestionTranslationNode[] = translationNodes.slice();
			const index = translationNodesCopy.findIndex(node => node.label === question.label);
			if (index > -1) {
				const parsedQuestion = Question.fromDTO(question);
				const translationNode = translationNodesCopy[index];
				translationNodesCopy.splice(index, 1, {
					...translationNode,
					element: {
						...translationNode.element,
						[parsedQuestion.answer.lang]: parsedQuestion
					}
				});
			}
			return {
				...state,
				updatingQuestionTranslation: false,
				translationNodes: translationNodesCopy
			};
		}),
		on(TranslationNodesActions.patchStudentAnswer, (state: TranslationsState, {}): TranslationsState => {
			return {
				...state,
				updatingStudentAnswerTranslation: true
			};
		}),
		on(TranslationNodesActions.studentAnswerPatched, ({ translationNodes, ...state }: TranslationsState, { studentAnswer }) => {
			const translationNodesCopy: QuestionTranslationNode[] = translationNodes.slice();
			const index = translationNodesCopy.findIndex(node => node.label === studentAnswer.question.label);
			if (index > -1) {
				const parsedStudentAnswer = StudentAnswer.fromDTO(studentAnswer);
				const translationNode = translationNodesCopy[index];
				const children = translationNode.children.slice();
				const studentAnswerNode = children[parsedStudentAnswer.student];
				const newStudentAnswerNode: StudentAnswerTranslationNode = {
					...studentAnswerNode,
					element: {
						...studentAnswerNode.element,
						[parsedStudentAnswer.text.lang]: parsedStudentAnswer
					}
				};
				children.splice(parsedStudentAnswer.student, 1, newStudentAnswerNode);
				translationNodesCopy.splice(index, 1, {
					...translationNode,
					children
				});
			}
			return {
				...state,
				updatingStudentAnswerTranslation: false,
				translationNodes: translationNodesCopy
			};
		})
	)
});
