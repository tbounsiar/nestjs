"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateType = exports.AuthenticationProvider = void 0;
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
