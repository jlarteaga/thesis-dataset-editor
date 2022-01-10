import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-labeled-data',
	templateUrl: './labeled-data.component.html',
	styleUrls: ['./labeled-data.component.scss']
})
export class LabeledDataComponent {

	@Input()
	label?: string = '';

	@Input()
	data?: string = '';

	constructor() {
	}

}
