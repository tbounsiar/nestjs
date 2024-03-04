"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WWWAuthenticationProvider = void 0;
const authenticationProvider_1 = require("../abstract/authenticationProvider");
const tokenError_1 = require("../token/tokenError");
/**
 * Class for WWW-Authenticate implementation
 */
class WWWAuthenticationProvider extends authenticationProvider_1.AuthenticationProvider {
    /**
     * @internal
     * @param authType
     * @param authorizationRegExp
     * @protected
     */
    constructor(authType, 
    /**
     * @internal
     */
    authorizationRegExp) {
        super(authType);
        this.authorizationRegExp = authorizationRegExp;
        /**
         * @internal
         */
        this._realm = 'NestJS-Security Application';
        /**
         * @internal
         */
        this._proxy = false;
    }
    /**
     * Set WWW-Authenticate realm
     * @param {string} realm realm value
     */
    realm(realm) {
        this._realm = realm;
        return this;
    }
    /**
     * Activate WWW-Authenticate proxy authentication
     */
    proxy() {
        this._proxy = true;
        return this;
    }
    /**
     * @internal
     * @param error
     */
    getAskHeader(error) {
        const key = `${this._proxy ? 'Proxy' : 'WWW'}-Authenticate`;
        const value = this.getAskHeaderValue(error);
        return [key, value];
    }
    /**
     * @internal
     */
    getAuthorization(request) {
        const authorization = request.headers[`${this._proxy ? 'proxy-' : ''}authorization`];
        if (!authorization) {
            return undefined;
        }
        if (!this.authorizationRegExp.test(authorization)) {
            throw new tokenError_1.TokenError('Invalid Authorization', 'invalid_authorization', `Invalid ${this._proxy ? 'proxy-' : ''}authorization(${authorization})`);
        }
        return this.authorizationRegExp.exec(authorization);
    }
}
exports.WWWAuthenticationProvider = WWWAuthenticationProvider;
