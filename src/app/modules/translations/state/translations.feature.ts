import { createFeature, createReducer, on } from '@ngrx/store';
import { TranslationNodesActions } from './actions';
import { ResourceStatus, translationsInitialState } from './translations.state';

export const TRANSLATIONS_FEATURE_NAME = 'translations';

export const translationsFeature = createFeature({
	name: TRANSLATIONS_FEATURE_NAME,
	reducer: createReducer(
		translationsInitialState,
		on(TranslationNodesActions.loadTranslationNodes, (state) => ({
			...state,
			translationNodesStatus: ResourceStatus.Loading
		})),
		on(TranslationNodesActions.setTranslationNodes, (state, { translationNodes }) => ({
			...state,
			translationNodes,
			translationNodesStatus: ResourceStatus.Loaded
		}))
	)
});
