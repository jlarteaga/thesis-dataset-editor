import { Component, Input } from '@angular/core';
import { RelatednessAlgorithmEnum, SimilarityMatricesDTO } from '../../../student-answers/dtos/similarity-matrices.dto';

@Component({
	selector: 'app-similarity-matrices-display',
	templateUrl: './similarity-matrices-display.component.html',
	styleUrls: ['./similarity-matrices-display.component.scss']
})
export class SimilarityMatricesDisplayComponent {

	relatednessAlgorithmNames: Map<RelatednessAlgorithmEnum, string> = new Map(
		[
			[RelatednessAlgorithmEnum.Lin, 'Lin'],
			[RelatednessAlgorithmEnum.Lesk, 'Lesk'],
			[RelatednessAlgorithmEnum.HirstStOnge, 'HirstStOnge'],
			[RelatednessAlgorithmEnum.Path, 'Path'],
			[RelatednessAlgorithmEnum.Resnik, 'Resnik'],
			[RelatednessAlgorithmEnum.JiangConrath, 'JiangConrath'],
			[RelatednessAlgorithmEnum.LeacockChodorow, 'LeacockChodorow'],
			[RelatednessAlgorithmEnum.WuPalmer, 'WuPalmer']
		]
	);

	relatednessAlgorithmImages: Map<RelatednessAlgorithmEnum, string> = new Map([
		[RelatednessAlgorithmEnum.Lin, 'lin'],
		[RelatednessAlgorithmEnum.Lesk, 'lesk'],
		[RelatednessAlgorithmEnum.HirstStOnge, 'hso'],
		[RelatednessAlgorithmEnum.Path, 'path'],
		[RelatednessAlgorithmEnum.Resnik, 'res'],
		[RelatednessAlgorithmEnum.JiangConrath, 'jcn'],
		[RelatednessAlgorithmEnum.LeacockChodorow, 'lch'],
		[RelatednessAlgorithmEnum.WuPalmer, 'wup']
	]);

	relatednessAlgorithms: Array<RelatednessAlgorithmEnum> = [
		RelatednessAlgorithmEnum.Lin,
		RelatednessAlgorithmEnum.Lesk,
		RelatednessAlgorithmEnum.HirstStOnge,
		RelatednessAlgorithmEnum.Path,
		RelatednessAlgorithmEnum.Resnik,
		RelatednessAlgorithmEnum.JiangConrath,
		RelatednessAlgorithmEnum.LeacockChodorow,
		RelatednessAlgorithmEnum.WuPalmer
	];

	errorMessage: string | null = null;

	private _data: SimilarityMatricesDTO | null = null;

	get data(): SimilarityMatricesDTO | null {
		return this._data;
	}

	@Input()
	set data(newData: SimilarityMatricesDTO | null | undefined) {
		this._data = newData || null;
	}

	constructor() {
	}

}
