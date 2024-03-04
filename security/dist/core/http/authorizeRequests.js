"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeRequestsBuilder = exports.AuthorizeRequests = void 0;
const requestMatcher_1 = require("./requestMatcher");
class AuthorizeRequests {
    /**
     * @internal
     * @param requestMatchers
     */
    constructor(
    /**
     * @internal
     */
    requestMatchers) {
        this.requestMatchers = requestMatchers;
    }
    static builder() {
        return new AuthorizeRequestsBuilder();
    }
    matchers() {
        return this.requestMatchers;
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
