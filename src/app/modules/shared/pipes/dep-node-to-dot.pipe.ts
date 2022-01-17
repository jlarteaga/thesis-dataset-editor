import { Pipe, PipeTransform } from '@angular/core';
import { FreelingDepNode } from '../components/freeling-display/models';

@Pipe({
	name: 'depNodeToDot'
})
export class DepNodeToDotPipe implements PipeTransform {

	transform(rootDepNode: FreelingDepNode): string {
		const dot: string[] = [];
		dot.push('digraph {');
		dot.push('rankdir=BT;');
		const queue: {
			parent: FreelingDepNode | null;
			node: FreelingDepNode;
		}[] = [{
			parent: null,
			node: rootDepNode
		}];

		while (queue.length) {
			// @ts-ignore
			const { parent, node } = queue.pop();
			// dot.push(`"${node.token.id}" [shape=record,label="${node.word}|{${node.token.tag}|${node.token.wn || '-'}}"];`);
			dot.push(`"${node.token.id}" [label="${node.word}"];`);
			if (parent) {
				dot.push(`"${node.token.id}"->"${parent.token.id}" [label="${node.function}"];`);
			}
			if (node.children && node.children.length) {
				queue.push(...node.children.map((childNode: FreelingDepNode) => ({
					parent: node,
					node: childNode
				})));
			}
		}

		dot.push('}');
		console.log(dot.join('\n'));
		return dot.join('');
	}

}
