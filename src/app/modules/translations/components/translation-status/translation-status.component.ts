import { Component, Input } from '@angular/core';
import { TextStatus } from '../../../student-answers/models/text';

export type size = 'small' | 'medium' | 'big';

@Component({
	selector: 'app-translation-status',
	templateUrl: './translation-status.component.html',
	styleUrls: ['./translation-status.component.scss']
})
export class TranslationStatusComponent {

	defaultSize: size = 'small';

	defaultStatus: TextStatus = TextStatus.Unknown;

	textStatusTexts: Record<TextStatus, string> = {
		[TextStatus.Empty]: 'empty',
		[TextStatus.CleanedTranslated]: 'cleaned',
		[TextStatus.ManuallyTranslated]: 'manual',
		[TextStatus.OriginalCleaned]: 'original',
		[TextStatus.TranslatedAutomatically]: 'auto',
		[TextStatus.Unknown]: '???'
	};

	@Input()
	status?: TextStatus;
	@Input()
	size?: size;

	textStatusColors: Record<TextStatus, string> = {
		[TextStatus.Empty]: 'red',
		[TextStatus.CleanedTranslated]: 'green',
		[TextStatus.ManuallyTranslated]: 'green',
		[TextStatus.OriginalCleaned]: 'gray',
		[TextStatus.TranslatedAutomatically]: 'yellow',
		[TextStatus.Unknown]: 'red'
	};

	constructor() {
	}

}
