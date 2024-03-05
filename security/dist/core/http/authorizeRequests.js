"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeRequestsBuilder = exports.AuthorizeRequests = void 0;
const requestMatcher_1 = require("./requestMatcher");
class AuthorizeRequests {
    /**
     * @internal
     * @param requestMatchers
     */
    constructor(requestMatchers) {
        /**
         * @internal
         */
        this.permissions = {};
        requestMatchers.forEach(requestMatcher => {
            requestMatcher.regex().forEach(regex => {
                const key = regex instanceof RegExp ? regex.source : regex;
                if (this.permissions[key]) {
                    if (this.permissions[key][requestMatcher.method()]) {
                        this.permissions[key][requestMatcher.method()].push(...requestMatcher.permissions());
                    }
                    else {
                        this.permissions[key][requestMatcher.method()] = requestMatcher.permissions();
                    }
                }
                else {
                    this.permissions[key] = {
                        [requestMatcher.method()]: requestMatcher.permissions(),
                    };
                }
            });
        });
    }
    static builder() {
        return new AuthorizeRequestsBuilder();
    }
    matchers() {
        return this.permissions || {};
    }
}
exports.AuthorizeRequests = AuthorizeRequests;
class AuthorizeRequestsBuilder {
    constructor() {
        /**
         * @internal
         * @private
         */
        this.requestMatchers = [];
    }
    requestMatcher(requestMatchers) {
        this.requestMatchers.push(requestMatchers instanceof requestMatcher_1.RequestMatcher ?
            requestMatchers : requestMatchers.build());
        return this;
    }
    build() {
        return new AuthorizeRequests(this.requestMatchers);
    }
}
exports.AuthorizeRequestsBuilder = AuthorizeRequestsBuilder;
