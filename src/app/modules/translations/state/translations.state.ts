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
}

export interface StudentAnswerTranslationNode {
	type: 'student-answer';
	index: number;
	questionLabel: string;
	element: Partial<Record<SupportedLanguage, StudentAnswer>>;
}

export enum ResourceStatus {
	NotLoaded = 'not-loaded',
	Loading = 'loading',
	Loaded = 'loaded'
}

export type TranslationNode = QuestionTranslationNode | StudentAnswerTranslationNode;

export interface TranslationsState {
	translationNodes: TranslationNode[];
	translationNodesStatus: ResourceStatus;
}

export const translationsInitialState: TranslationsState = {
	translationNodes: [],
	translationNodesStatus: ResourceStatus.NotLoaded
};
