import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuestionActions } from '../../../../state/actions';
import { State } from '../../../../state/reducers';
import { selectTranslationNodes, TranslationNode } from '../../../../state/selectors/translations/translation-tree.selectors';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	questions$: Observable<TranslationNode[]>;

	constructor(
		private store: Store<State>
	) {
		store.dispatch(QuestionActions.getAllQuestions());
		this.questions$ = store.select(selectTranslationNodes);
	}

	ngOnInit(): void {
	}

}
