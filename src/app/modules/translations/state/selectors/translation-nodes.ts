import { createSelector } from '@ngrx/store';
import { TRANSLATIONS_FEATURE_NAME } from '../translations.feature';
import { TranslationsState } from '../translations.state';

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