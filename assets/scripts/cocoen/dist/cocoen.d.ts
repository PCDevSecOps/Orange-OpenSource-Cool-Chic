// Generated by dts-bundle-generator v5.8.0

export declare type Orientation = "horizontal" | "vertical";
export declare type CustomEventPayload = {
	bubbles: boolean;
	composed: boolean;
	detail: {
		elementSize: number;
		openRatio: number;
		isRendered: boolean;
		isVisible: boolean;
	};
};
declare class Cocoen extends HTMLElement {
	private drag;
	private intersectionObserver;
	private shadowDOM;
	private debouncedUpdateDimensions;
	private onClickHandler;
	private onContextMenuHandler;
	private onDragEndHandler;
	private onDragHandler;
	private onDragStartHandler;
	private onIntersectionHandler;
	private animateToValue;
	private colorValue;
	private orientationValue;
	private dragElementSizeValue;
	private elementSizeValue;
	private isDraggingValue;
	private openRatioValue;
	private isRenderedValue;
	private isVisibleValue;
	private pointValue;
	constructor();
	get point(): number;
	set point(value: number);
	get elementSize(): number;
	set elementSize(value: number);
	get dragElementSize(): number;
	set dragElementSize(value: number);
	get isDragging(): boolean;
	set isDragging(value: boolean);
	get openRatio(): number;
	set openRatio(value: number);
	get color(): string;
	set color(value: string);
	get isVisible(): boolean;
	set isVisible(value: boolean);
	get isRendered(): boolean;
	set isRendered(value: boolean);
	get animateTo(): number;
	set animateTo(value: number);
	get orientation(): Orientation;
	set orientation(value: Orientation);
	static get observedAttributes(): Array<string>;
	attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
	connectedCallback(): void;
	disconnectedCallback(): void;
	render(): void;
	updateDimensions(): void;
	updateStyles(): void;
	onDragStart(): void;
	onDrag(event: MouseEvent | TouchEvent): void;
	onDragEnd(): void;
	onClick(event: MouseEvent): void;
	onContextMenu(): void;
	onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
	customEventPayload(): CustomEventPayload;
}
export declare type Options = {
	start?: number;
	color?: string;
	orientation?: Orientation;
	[key: string]: unknown;
};
export declare const create: (element: HTMLElement, options?: Options | undefined) => Cocoen;
export declare const parse: (context: HTMLElement) => void;

export {};