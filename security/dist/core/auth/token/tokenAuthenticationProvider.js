"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAuthenticationProvider = void 0;
const wwwAuthenticationProvider_1 = require("../impl/wwwAuthenticationProvider");
const authenticationProvider_1 = require("../abstract/authenticationProvider");
/**
 * @internal
 */
const CREDENTIALS_REGEXP = /^bearer\s(.*)/i;
class TokenAuthenticationProvider extends wwwAuthenticationProvider_1.WWWAuthenticationProvider {
    /**
     * @internal
     */
    constructor() {
        super(authenticationProvider_1.AuthenticateType.BEARER, CREDENTIALS_REGEXP);
    }
    /**
     * @internal
     */
    getAuthentication(request) {
        let authorization = this.getAuthorization(request);
        return this._tokenParser.parse(authorization ? authorization[1] : undefined);
    }
    tokenParser(tokenParser) {
        this._tokenParser = tokenParser;
        return this;
    }
    /**
     * @internal
     */
    getAskHeaderValue(error) {
        const header = [`Bearer realm="${this._realm}"`];
        if (error) {
            if (error.name) {
                header.push(`error="${error.name}"`);
            }
            if (error.description) {
                header.push(`error_description="${error.description}"`);
            }
        }
        return header.join(', ');
    }
}
exports.TokenAuthenticationProvider = TokenAuthenticationProvider;
