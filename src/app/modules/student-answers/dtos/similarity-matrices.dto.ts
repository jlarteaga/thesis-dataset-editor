export enum RelatednessAlgorithmEnum {
	HirstStOnge = 'hso',
	LeacockChodorow = 'lch',
	Lesk = 'lesk',
	WuPalmer = 'wup',
	Resnik = 'res',
	Path = 'path',
	JiangConrath = 'jcn',
	Lin = 'lin',
}

export type SimilarityMatricesDTO = Record<RelatednessAlgorithmEnum, number[][]> & {
	synsets1: string[];
	synsets2: string[];
};