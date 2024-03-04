"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpSecurity = void 0;
const authorizeRequests_1 = require("./authorizeRequests");
const path_to_regexp_1 = require("path-to-regexp");
class HttpSecurity {
    /**
     * @internal
     * @param builder
     */
    constructor(
    /**
     * @internal
     */
    builder) {
        this.builder = builder;
        /**
         * @internal
         * @private
         */
        this._authorizeRequests = [];
    }
    authorize(authorizeRequests) {
        this._authorizeRequests.push(authorizeRequests instanceof authorizeRequests_1.AuthorizeRequests ?
            authorizeRequests : authorizeRequests.build());
        return this;
    }
    // cors(options?: CorsOptions | CorsOptionsDelegate<any>): HttpSecurity {
    //   this.application.enableCors(options);
    //   return this;
    // }
    /**
     * @internal
     * @param path
     * @param method
     */
    getMatchers(path, method) {
        return this._authorizeRequests
            .reduce((acc, authorize) => {
            return acc.concat(authorize.matchers());
        }, []).filter((matcher) => {
            const regex = (0, path_to_regexp_1.pathToRegexp)(matcher.regex());
            if (regex.test(path)) {
                if (matcher.methods().length > 0) {
                    return matcher.methods().includes(method);
                }
                return true;
            }
            return false;
        });
    }
    and() {
        return this.builder;
    }
}
exports.HttpSecurity = HttpSecurity;
