import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ResourceStatus } from '../../../../state/global.state';
import { loadQuestionTranslationNodes } from '../../state/actions/translation-nodes.actions';
import { selectTranslationNodes, selectTranslationNodesStatus } from '../../state/selectors/translation-nodes';
import { TranslationNode } from '../../state/translations.state';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	translationNodes$: Observable<TranslationNode[]>;
	translationNodesStatus$: Observable<ResourceStatus>;
	areTranslationNodesLoaded$: Observable<boolean>;

	constructor(
		private store: Store
	) {
		this.translationNodes$ = store.select(selectTranslationNodes);
		this.translationNodesStatus$ = store.select(selectTranslationNodesStatus);
		this.areTranslationNodesLoaded$ = this.translationNodesStatus$.pipe(
			map(status => ResourceStatus.Loaded === status)
		);
		this.store.dispatch(loadQuestionTranslationNodes());
	}

	ngOnInit(): void {
	}

}
