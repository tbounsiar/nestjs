"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpression = exports.PreAuthorize = void 0;
const core_1 = require("@nestjs/core");
/**
 * Decorator for specifying a method access-control expression which will be evaluated to decide whether a method invocation is allowed or not.
 * @param {string} authorization: The method access-control expression
 * @constructor
 */
exports.PreAuthorize = core_1.Reflector.createDecorator();
/**
 * @internal
 */
const REQ_ARG = {
    Session: 'session',
    Param: 'params',
    Body: 'body',
    Query: 'query',
    Headers: 'headers',
    HostParam: 'hosts',
    Ip: 'ip',
};
/**
 * @internal
 */
const ARG_REGEX = /@(Param|Query|Body|Headers|Session|HostParam|Request|Req|Ip)\(('([A-Za-z0-9_-]+)'|"([A-Za-z0-9_-]+)")?\)/;
/**
 * @internal
 */
function getExpression(authorization) {
    while (ARG_REGEX.test(authorization)) {
        authorization = authorization.replace(ARG_REGEX, replaceFn);
    }
    const AND_REGEX = /(\)|[ \n]+)(AND|and|And)/;
    while (AND_REGEX.test(authorization)) {
        authorization = authorization.replace(AND_REGEX, '$1&&');
    }
    const OR_REGEX = /(\)|[ \n]+)(OR|or|Or)/;
    while (OR_REGEX.test(authorization)) {
        authorization = authorization.replace(OR_REGEX, '$1||');
    }
    authorization = authorization.replace(/\$./g, 'authentication.');
    return authorization;
}
exports.getExpression = getExpression;
/**
 * @internal
 */
function replaceFn(match) {
    // Matched substring is passed as a parameter
    const groups = ARG_REGEX.exec(match);
    const rep = 'request';
    if (REQ_ARG[groups[1]]) {
        if (groups[1] === 'Ip' && groups[4]) {
            throw new Error('@Ip cannot have arg ' + match);
        }
        return (rep +
            '.' +
            REQ_ARG[groups[1]] +
            (groups[4] ? '["' + groups[4] + '"]' : ''));
    }
    return rep;
}
