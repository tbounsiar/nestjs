"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.pathToRegex = exports.getMatchExpression = void 0;
const path_to_regexp_1 = require("path-to-regexp");
/**
 * @internal
 * @param matchers
 */
function getMatchExpression(matchers) {
    const permissions = [];
    let expression = undefined;
    matchers.forEach((matcher) => {
        matcher.permissions().forEach((p) => {
            permissions.push(`authentication.${p}`);
        });
    });
    if (permissions.length > 0) {
        expression = permissions.join(' || ');
    }
    return expression;
}
exports.getMatchExpression = getMatchExpression;
/**
 * @internal
 * Fix pathToRegexp bug
 * @param regex
 */
function pathToRegex(...regex) {
    const source = (0, path_to_regexp_1.pathToRegexp)(regex).source.replace(/\[\\\/#\\\?\]\?\$/g, '');
    return new RegExp(source + '(?:[\\/#\\?].*)?$');
}
exports.pathToRegex = pathToRegex;
/**
 * @internal
 * @param length
 */
function generate(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.generate = generate;
