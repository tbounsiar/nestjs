"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMatcherBuilder = exports.RequestMatcher = void 0;
const common_1 = require("@nestjs/common");
class RequestMatcher {
    /**
     * @internal
     * @param _methods
     * @param _permissions
     * @param _regex
     */
    constructor(
    /**
     * @internal
     */
    _method, 
    /**
     * @internal
     */
    _permissions, 
    /**
     * @internal
     */
    _regex) {
        this._method = _method;
        this._permissions = _permissions;
        this._regex = _regex;
    }
    /**
     * @internal
     */
    method() {
        return this._method || common_1.RequestMethod.ALL;
    }
    /**
     * @internal
     */
    regex() {
        return this._regex;
    }
    /**
     * @internal
     */
    permissions() {
        return this._permissions;
    }
    static builder() {
        return new RequestMatcherBuilder();
    }
}
exports.RequestMatcher = RequestMatcher;
/**
 * @internal
 */
RequestMatcher.PERMIT_ALL = 'PERMIT_ALL';
class RequestMatcherBuilder {
    constructor() {
        /**
         * @internal
         * @private
         */
        this._permissions = [];
    }
    requestMatcher(...regex) {
        this._regex = regex;
        return this;
    }
    withMethod(method) {
        this._method = method;
        return this;
    }
    permitAll() {
        this._permissions.push(RequestMatcher.PERMIT_ALL);
        return this;
    }
    hasRole(role) {
        this._permissions.push(`hasRole("${role}")`);
        return this;
    }
    hasAnyRoles(...roles) {
        this._permissions.push(`hasAnyRoles(${roles.map((role) => `"${role}"`).join(', ')})`);
        return this;
    }
    hasAuthority(authority) {
        this._permissions.push(`hasAuthority("${authority}")`);
        return this;
    }
    hasAnyAuthorities(...authorities) {
        this._permissions.push(`hasAnyAuthorities(${authorities.map((authority) => `"${authority}"`).join(', ')})`);
        return this;
    }
    anyRequest() {
        this._regex = ['/(.*)'];
        return this;
    }
    build() {
        return new RequestMatcher(this._method, this._permissions, this._regex);
    }
}
exports.RequestMatcherBuilder = RequestMatcherBuilder;
