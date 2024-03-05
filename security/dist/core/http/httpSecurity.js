"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpSecurity = void 0;
const common_1 = require("@nestjs/common");
const authorizeRequests_1 = require("./authorizeRequests");
const utils_1 = require("../utils/utils");
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
    }
    authorize(authorizeRequests) {
        this._authorizeRequests = authorizeRequests instanceof authorizeRequests_1.AuthorizeRequests ? authorizeRequests : authorizeRequests.build();
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
    getPermission(path, method) {
        let permissions;
        const matchers = this._authorizeRequests.matchers();
        for (let regex in matchers) {
            const pathRegex = (0, utils_1.pathToRegex)(regex);
            if (pathRegex.test(path)) {
                permissions = matchers[regex];
            }
        }
        return permissions ? permissions[method] || permissions[common_1.RequestMethod.ALL] : [];
    }
    and() {
        return this.builder;
    }
}
exports.HttpSecurity = HttpSecurity;
