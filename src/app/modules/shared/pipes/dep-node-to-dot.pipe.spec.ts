import { DepNodeToDotPipe } from './dep-node-to-dot.pipe';

describe('DepNodeToDotPipe', () => {
	it('create an instance', () => {
		const pipe = new DepNodeToDotPipe();
		expect(pipe).toBeTruthy();
	});
});
