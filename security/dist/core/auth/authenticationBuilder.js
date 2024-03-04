"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationBuilder = void 0;
const authErrorHandlingImpl_1 = require("./impl/authErrorHandlingImpl");
class AuthenticationBuilder {
    /**
     * @internal
     */
    constructor(
    /**
     * @internal
     * @private
     */
    builder) {
        this.builder = builder;
        /**
         * @internal
         * @private
         */
        this._errorHandling = new authErrorHandlingImpl_1.AuthErrorHandlingImpl();
    }
    errorHandling(errorHandling) {
        if (errorHandling === undefined) {
            return this._errorHandling;
        }
        this._errorHandling = errorHandling;
        return this;
    }
    authenticationProvider(authenticationProvider) {
        if (authenticationProvider === undefined) {
            return this._authenticationProvider;
        }
        this._authenticationProvider = authenticationProvider;
        return this;
    }
    authenticator(authenticator) {
        if (authenticator === undefined) {
            return this._authenticator;
        }
        this._authenticator = authenticator;
        return this;
    }
    and() {
        return this.builder;
    }
}
exports.AuthenticationBuilder = AuthenticationBuilder;
