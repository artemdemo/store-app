export declare var window: Window;
export declare var DocumentFragment: DocumentFragment;
export declare var Node: Node;
export declare var NodeList: NodeList;
export declare var Text: Text;
export declare var Element: HTMLElement;
export interface Element extends HTMLElement {
}
export declare var TemplateElement: HTMLTemplateElement;
export declare var StyleElement: HTMLStyleElement;
export declare var document: Document;
export declare var location: Location;
export declare var gc: () => void;
export declare class DOM {
    static query(selector: any): Element;
    static querySelector(el: any, selector: string): Node;
    static querySelectorAll(el: any, selector: string): NodeList;
    static on(el: any, evt: any, listener: any): void;
    static dispatchEvent(el: any, evt: any): void;
    static createMouseEvent(eventType: any): MouseEvent;
    static createEvent(eventType: any): Event;
    static getInnerHTML(el: any): any;
    static getOuterHTML(el: any): any;
    static firstChild(el: any): Node;
    static nextSibling(el: any): Node;
    static parentElement(el: any): any;
    static childNodes(el: any): NodeList;
    static childNodesAsList(el: any): List<any>;
    static clearNodes(el: any): void;
    static appendChild(el: any, node: any): void;
    static removeChild(el: any, node: any): void;
    static remove(el: Element): Element;
    static insertBefore(el: any, node: any): void;
    static insertAllBefore(el: any, nodes: any): void;
    static insertAfter(el: any, node: any): void;
    static setInnerHTML(el: any, value: any): void;
    static getText(el: Element): string;
    static setText(el: any, value: string): void;
    static createTemplate(html: any): HTMLTemplateElement;
    static createElement(tagName: any, doc?: Document): HTMLAnchorElement;
    static createScriptTag(attrName: string, attrValue: string, doc?: Document): HTMLElement;
    static createStyleElement(css: string, doc?: Document): StyleElement;
    static clone<T extends Node>(node: T): T;
    static hasProperty(element: Element, name: string): boolean;
    static getElementsByClassName(element: Element, name: string): NodeList;
    static getElementsByTagName(element: Element, name: string): NodeList;
    static classList(element: Element): List<any>;
    static addClass(element: Element, classname: string): void;
    static removeClass(element: Element, classname: string): void;
    static hasClass(element: Element, classname: string): boolean;
    static setStyle(element: Element, stylename: string, stylevalue: string): void;
    static removeStyle(element: Element, stylename: string): void;
    static getStyle(element: Element, stylename: string): any;
    static tagName(element: Element): string;
    static attributeMap(element: Element): Map<any, any>;
    static getAttribute(element: Element, attribute: string): string;
    static setAttribute(element: Element, name: string, value: string): void;
    static removeAttribute(element: Element, attribute: string): void;
    static templateAwareRoot(el: Element): Node;
    static createHtmlDocument(): Document;
    static defaultDoc(): Document;
    static elementMatches(n: any, selector: string): boolean;
}
