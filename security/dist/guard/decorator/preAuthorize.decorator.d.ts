/**
 * Decorator for specifying a method access-control expression which will be evaluated to decide whether a method invocation is allowed or not.
 * @param {string} authorization: The method access-control expression
 * @constructor
 */
export declare const PreAuthorize: import("@nestjs/core").ReflectableDecorator<string, string>;
