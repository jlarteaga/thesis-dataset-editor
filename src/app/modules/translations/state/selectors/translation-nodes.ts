import { createSelector } from '@ngrx/store';
import { selectRouteParam } from '../../../../state/selectors/router.selectors';
import { TRANSLATIONS_FEATURE_NAME } from '../translations.feature';
import { QuestionTranslationNode, StudentAnswerTranslationNode, TranslationsState } from '../translations.state';

export const selectTranslationFeature = (state: any): TranslationsState => {
	return state[TRANSLATIONS_FEATURE_NAME];
};

export const selectTranslationNodes = createSelector(
	selectTranslationFeature,
	(state: TranslationsState) => state.translationNodes
);

export const selectTranslationNodesStatus = createSelector(
	selectTranslationFeature,
	(state: TranslationsState) => state.translationNodesStatus
);

export const selectFocusedQuestion = createSelector(
	selectRouteParam('questionLabel'),
	selectTranslationNodes,
	(questionLabel, questionTranslationNodes): QuestionTranslationNode | null => {
		if (questionLabel) {
			return questionTranslationNodes.find(node => node.label === questionLabel) || null;
		} else {
			return null;
		}
	}
);

export const selectFocusedStudentAnswer = createSelector(
	selectRouteParam('studentAnswerIndex'),
	selectFocusedQuestion,
	(studentAnswerIndex, focusedQuestion): StudentAnswerTranslationNode | null => {
		if (studentAnswerIndex !== null && focusedQuestion) {
			return focusedQuestion.children[Number(studentAnswerIndex)] || null;
		} else {
			return null;
		}
	}
);

export const selectUpdatingQuestionTranslation = createSelector(
	selectTranslationFeature,
	(state: TranslationsState) => state.updatingQuestionTranslation
);

export const selectUpdatingStudentAnswerTranslation = createSelector(
	selectTranslationFeature,
	(state: TranslationsState) => state.updatingStudentAnswerTranslation
);