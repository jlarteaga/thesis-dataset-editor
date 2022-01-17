import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { wasmFolder } from '@hpcc-js/wasm';
import { Graphviz, graphviz } from 'd3-graphviz';

@Component({
	selector: 'app-graphviz-display',
	templateUrl: './graphviz-display.component.html',
	styleUrls: ['./graphviz-display.component.scss']
})
export class GraphvizDisplayComponent implements AfterViewInit, OnDestroy {
	@ViewChild('graph') graph!: ElementRef;
	private graphviz: Graphviz<any, any, any, any> | null = null;

	private _dot: string | null = null;

	@Input() set dot(newDot: string | null) {
		this._dot = newDot;
		this.updateDotContent();
	};

	constructor() {
		wasmFolder('/assets/wasm/');
	}

	ngAfterViewInit(): void {
		if (!this.graph || !this.graph.nativeElement) {
			return;
		}
		this.graphviz = graphviz(this.graph.nativeElement, {
			useWorker: true
		});
		this.updateDotContent();
	}

	ngOnDestroy(): void {
		const pepe = this.graphviz as any;
		if (pepe.destroy) {
			pepe.destroy();
		}
	}

	private updateDotContent() {
		if (this.graphviz && this._dot) {
			this.graphviz.renderDot(this._dot);
		}
	}
}
