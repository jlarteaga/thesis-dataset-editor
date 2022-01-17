import { ResourceStatus } from '../../../state/global.state';
import { SupportedLanguage } from '../../../utils/global-types';
import { Question } from '../../questions/models/question';
import { StudentAnswer } from '../../student-answers/models/student-answer';

export interface QuestionTranslationNode {
	type: 'question';
	testNumber: number;
	questionNumber: number;
	label: string;
	element: Partial<Record<SupportedLanguage, Question>>;
	children: StudentAnswerTranslationNode[];
	isLoading: boolean;
}

export interface StudentAnswerTranslationNode {
	type: 'student-answer';
	index: number;
	questionLabel: string;
	element: Partial<Record<SupportedLanguage, StudentAnswer>>;
}

export type TranslationNode = QuestionTranslationNode | StudentAnswerTranslationNode;

export interface TranslationsState {
	translationNodes: QuestionTranslationNode[];
	translationNodesStatus: ResourceStatus;
	subTranslationNodesStatus: ResourceStatus;
	updatingQuestionTranslation: boolean;
	updatingStudentAnswerTranslation: boolean;
}

export const translationsInitialState: TranslationsState = {
	translationNodes: [],
	translationNodesStatus: ResourceStatus.NotLoaded,
	subTranslationNodesStatus: ResourceStatus.NotLoaded,
	updatingQuestionTranslation: false,
	updatingStudentAnswerTranslation: false
};
