import { createAction, props } from '@ngrx/store';
import { TranslationNode } from '../translations.state';

enum TranslationNodesAction {
	LOAD = '[Translations] Load nodes',
	SET = '[Translations] Set nodes',
	LOADED = '[Translations] Loaded nodes'
}

export const loadTranslationNodes = createAction(
	TranslationNodesAction.LOAD
);

export const setTranslationNodes = createAction(
	TranslationNodesAction.SET,
	props<{
		translationNodes: TranslationNode[]
	}>()
);

export const translationNodesLoaded = createAction(
	TranslationNodesAction.LOADED
);