"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAuthenticationProvider = void 0;
const wwwAuthenticationProvider_1 = require("./wwwAuthenticationProvider");
const requestAuthenticationImpl_1 = require("./requestAuthenticationImpl");
class WebAuthenticationProvider extends wwwAuthenticationProvider_1.WWWAuthenticationProvider {
    /**
     * @internal
     */
    constructor(authType, authorizationRegExp, 
    /**
     * @internal
     */
    authenticationBuilder) {
        super(authType, authorizationRegExp);
        this.authenticationBuilder = authenticationBuilder;
    }
    /**
     * @internal
     * @param request
     */
    buildAuthentication(request) {
        const authentication = this.getUserAuthentication(request);
        return new requestAuthenticationImpl_1.RequestAuthenticationImpl(authentication);
    }
    /**
     * @internal
     * Get User from request
     * @param request
     * @private
     */
    getUserAuthentication(request) {
        const authorization = this.getAuthorization(request);
        if (!authorization) {
            return undefined;
        }
        return this.parse(authorization, request);
    }
}
exports.WebAuthenticationProvider = WebAuthenticationProvider;
