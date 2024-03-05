"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicWebAuthenticationProvider = void 0;
const crypto_utils_1 = require("../../utils/crypto-utils");
const webAuthenticationProvider_1 = require("./webAuthenticationProvider");
const authenticationProvider_1 = require("../abstract/authenticationProvider");
const CREDENTIALS_REGEXP = /^basic\s(.*)/i;
const USER_PASS_REGEXP = /^([^:]*):(.*)$/;
/**
 * Class for WWW-Authenticate Basic implementation
 */
class BasicWebAuthenticationProvider extends webAuthenticationProvider_1.WebAuthenticationProvider {
    /**
     * @internal
     * @param authenticationBuilder
     */
    constructor(authenticationBuilder) {
        super(authenticationProvider_1.AuthenticateType.BASIC, CREDENTIALS_REGEXP, authenticationBuilder);
        /**
         * @internal
         * @private
         */
        this._charset = 'utf-8';
    }
    /**
     * @internal
     * @private
     */
    getAskHeaderValue() {
        return `Basic realm="${this._realm}", charset="${this._charset}"`;
    }
    /**
     * Set WWW-Authenticate Digest charset
     * @param charset {BufferEncoding}: charset value
     */
    charset(charset) {
        this._charset = charset;
        return this;
    }
    /**
     * @internal
     * @private
     */
    parse(authorization) {
        // decode user pass
        const userPassword = USER_PASS_REGEXP.exec((0, crypto_utils_1.base64Decode)(authorization[1], this._charset));
        if (!userPassword) {
            return undefined;
        }
        return this.authenticationBuilder.authenticator().authenticate(userPassword[1], userPassword[2]);
    }
}
exports.BasicWebAuthenticationProvider = BasicWebAuthenticationProvider;
