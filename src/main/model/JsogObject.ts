/**
 * Object in a JavaScript Object Graph
 */
export interface JsogObject {
    '@id': string;
    [property: string]: any;
}
