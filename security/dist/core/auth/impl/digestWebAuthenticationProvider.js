"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigestWebAuthenticationProvider = void 0;
const webAuthenticationProvider_1 = require("./webAuthenticationProvider");
const crypto_utils_1 = require("../../utils/crypto-utils");
const utils_1 = require("../../utils/utils");
const authenticationProvider_1 = require("../abstract/authenticationProvider");
const CREDENTIALS_REGEXP = /^digest\s(.*)/i;
const PARAMS_SPLITER_REGEXP = /,(?=(?:[^"]|"[^"]*")*$)/;
const STRIP_QUOTES_WHITESPACE_REGEXP = /(\w+)=["]?([^"]*)["]?$/;
/**
 * Class for WWW-Authenticate Digest implementation
 */
class DigestWebAuthenticationProvider extends webAuthenticationProvider_1.WebAuthenticationProvider {
    /**
     * @internal
     * @param authenticationBuilder
     */
    constructor(authenticationBuilder) {
        super(authenticationProvider_1.AuthenticateType.DIGEST, CREDENTIALS_REGEXP, authenticationBuilder);
        /**
         * @internal
         * @private
         */
        this.nonces = [];
        /**
         * @internal
         * @private
         */
        this.opaques = [];
        /**
         * @internal
         * @private
         */
        this._opaque = false;
        /**
         * @internal
         * @private
         */
        this._qop = false;
    }
    /**
     * Set WWW-Authenticate Digest domain
     * @param domain {string}: domain value
     */
    domain(domain) {
        this._domain = domain;
        return this;
    }
    /**
     * Activate WWW-Authenticate Digest opaque
     */
    opaque() {
        this._opaque = true;
        return this;
    }
    /**
     * Set WWW-Authenticate Digest algorithm
     * @param algorithm {DigestAlgorithm}: algorithm value
     */
    algorithm(algorithm) {
        this._algorithm = algorithm;
        return this;
    }
    /**
     * Set WWW-Authenticate Digest qop 'auth'
     */
    qop() {
        this._qop = true;
        return this;
    }
    /**
     * @internal
     * @private
     */
    parse(authorization, request) {
        const params = authorization[1];
        // Split the parameters by comma.
        const tokens = params.split(PARAMS_SPLITER_REGEXP);
        const options = {};
        // Parse parameters.
        let i = 0;
        const len = tokens.length;
        while (i < len) {
            // Strip quotes and whitespace.
            const param = STRIP_QUOTES_WHITESPACE_REGEXP.exec(tokens[i]);
            if (param) {
                options[param[1]] = param[2];
            }
            ++i;
        }
        if (this.validate(options)) {
            let ha2 = (0, crypto_utils_1.md5)(`${request.method}:${options.uri}`);
            return this.validateUser(options.username, ha2, options);
        }
        return undefined;
    }
    /**
     * @internal
     * @param username
     * @param ha2
     * @param options
     * @private
     */
    validateUser(username, ha2, options) {
        const user = this.authenticationBuilder.authenticator().authenticate(username);
        if (user) {
            let ha1 = (0, crypto_utils_1.md5)(`${user.username}:${this._realm}:${user.password}`);
            // Algorithm.
            if (options.algorithm === 'MD5-sess') {
                ha1 = (0, crypto_utils_1.md5)(`${ha1}:${options.nonce}:${options.cnonce}`);
            }
            let response = options.qop ?
                (0, crypto_utils_1.md5)(`${ha1}:${options.nonce}:${options.nc}:${options.cnonce}:${options.qop}:${ha2}`) :
                (0, crypto_utils_1.md5)(`${ha1}:${options.nonce}:${ha2}`);
            // If calculated response is equal to client's response.
            return response === options.response ? user : undefined;
        }
        return undefined;
    }
    /**
     * @internal
     * @private
     */
    getAskHeaderValue() {
        const nonce = (0, crypto_utils_1.md5)((0, utils_1.generate)(10));
        this.nonces.push({
            id: nonce,
            date: Date.now(),
            nc: 0,
        });
        const options = [`Digest realm="${this._realm}"`];
        if (this._domain) {
            options.push(`domain="${this._domain}"`);
        }
        options.push(`nonce="${nonce}"`);
        if (this._opaque) {
            const opaque = (0, crypto_utils_1.md5)((0, utils_1.generate)(10));
            this.opaques.push({ id: nonce, date: Date.now(), nop: 0 });
            options.push(`opaque="${opaque}"`);
        }
        if (this._algorithm) {
            options.push(`algorithm="${this._algorithm}"`);
        }
        if (this._qop) {
            options.push(`qop="auth"`);
        }
        return options.join(', ');
    }
    /**
     * @internal
     * @private
     */
    // Validate nonce.
    validate(options) {
        let found = false;
        // Nonces for removal.
        const noncesToRemove = [];
        // Current time.
        const now = Date.now();
        // Searching for not expired ones.
        this.nonces.forEach((serverNonce) => {
            if (serverNonce.date + 3600000 > now) {
                if (serverNonce.id === options.nonce) {
                    if (options.qop) {
                        // Request counter is hexadecimal.
                        const ncNum = Number.parseInt(options.nc, 16);
                        if (ncNum > serverNonce.nc) {
                            found = true;
                            serverNonce.nc = ncNum;
                        }
                    }
                    else {
                        found = true;
                    }
                }
            }
            else {
                noncesToRemove.push(serverNonce);
            }
        });
        // Remove expired nonces.
        this.removeNonces(...noncesToRemove);
        // TODO validate opaque
        return found;
    }
    /**
     * @internal
     * @private
     */
    // Remove nonces.
    removeNonces(...noncesToRemove) {
        noncesToRemove.forEach((nonce) => {
            const index = this.nonces.indexOf(nonce);
            if (index !== -1) {
                this.nonces.splice(index, 1);
            }
        });
    }
}
exports.DigestWebAuthenticationProvider = DigestWebAuthenticationProvider;
