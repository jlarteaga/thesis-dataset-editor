import { FreelingDepNode, FreelingDocument } from '../models';

export const parseDependenciesFromSentence = (sentenceSource: any, freelingDocument: FreelingDocument): FreelingDepNode => {
	if (!sentenceSource.dependencies) {
		throw new Error('The sentence must have a dependencies tag');
	}
	if (!sentenceSource.dependencies.depnode) {
		throw new Error('The sentence does not have a head depnode');
	}
	const root = {
		children: []
	};
	const stack: {
		parent: Partial<FreelingDepNode>,
		object: any
	}[] = [{
		parent: root,
		object: sentenceSource.dependencies.depnode
	}];
	while (stack.length > 0) {
		// @ts-ignore
		const { parent, object } = stack.pop();

		if (!object['@_token'] || !freelingDocument.containsToken(object['@_token'])) {
			throw new Error(`Invalid token ${object['@_token']} in depnode`);
		}
		if (!object['@_function']) {
			throw new Error('The depnode does not have a function');
		}
		if (!object['@_word']) {
			throw new Error('The depnode does not have a word');
		}
		const depNode: FreelingDepNode = {
			// @ts-ignore
			token: freelingDocument.getToken(object['@_token']),
			function: object['@_function'],
			word: object['@_word']
		};
		parent.children = parent.children || [];
		parent.children.push(depNode);
		if (object.depnode) {
			(Array.isArray(object.depnode) ? object.depnode : [object.depnode])
				.forEach((leaf: any) => stack.push({
					parent: depNode,
					object: leaf
				}));
		}
	}
	return root.children[0];
};