"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateType = exports.AuthenticationProvider = exports.Authentication = exports.wrapper = void 0;
const common_1 = require("@nestjs/common");
const wrapper_1 = require("../../utils/wrapper");
/**
 * @internal
 */
exports.wrapper = new wrapper_1.Wrapper(undefined);
exports.Authentication = (0, common_1.createParamDecorator)((data, ctx) => {
    return exports.wrapper.get();
});
/**
 * Interface to implement an Authentication Provider
 */
class AuthenticationProvider {
    /**
     * @internal
     * @param _authenticateType
     */
    constructor(
    /**
     * @internal
     * @private
     */
    _authenticateType) {
        this._authenticateType = _authenticateType;
    }
    getAuthentication(request) {
        const authentication = this.buildAuthentication(request);
        exports.wrapper.set(authentication);
        return authentication;
    }
    /**
     * @internal
     */
    authenticateType() {
        return this._authenticateType;
    }
}
exports.AuthenticationProvider = AuthenticationProvider;
/**
 * @internal
 */
var AuthenticateType;
(function (AuthenticateType) {
    AuthenticateType["BASIC"] = "Basic";
    AuthenticateType["DIGEST"] = "Digest";
    AuthenticateType["BEARER"] = "Bearer";
    AuthenticateType["FORM_LOGIN"] = "FORM_LOGIN";
})(AuthenticateType || (exports.AuthenticateType = AuthenticateType = {}));
