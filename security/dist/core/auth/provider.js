"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const sessionAuthenticationProvider_1 = require("./impl/sessionAuthenticationProvider");
const authenticationProvider_1 = require("./abstract/authenticationProvider");
const basicWebAuthenticationProvider_1 = require("./impl/basicWebAuthenticationProvider");
const digestWebAuthenticationProvider_1 = require("./impl/digestWebAuthenticationProvider");
const tokenAuthenticationProvider_1 = require("./token/tokenAuthenticationProvider");
const jwtTokenAuthenticationProvider_1 = require("./token/jwt/jwtTokenAuthenticationProvider");
const memoryAuthenticator_1 = require("./impl/memoryAuthenticator");
class Provider {
    /**
     * @internal
     * @param authenticationBuilder
     */
    constructor(
    /**
     * @internal
     */
    authenticationBuilder) {
        this.authenticationBuilder = authenticationBuilder;
    }
    sessionAuthentication() {
        return new sessionAuthenticationProvider_1.SessionAuthenticationProvider(authenticationProvider_1.AuthenticateType.FORM_LOGIN);
    }
    basicAuthentication() {
        return new basicWebAuthenticationProvider_1.BasicWebAuthenticationProvider(this.authenticationBuilder);
    }
    digestAuthentication() {
        return new digestWebAuthenticationProvider_1.DigestWebAuthenticationProvider(this.authenticationBuilder);
    }
    tokenAuthentication() {
        return new tokenAuthenticationProvider_1.TokenAuthenticationProvider();
    }
    jwtTokenAuthentication(secret) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const jwt = require('jsonwebtoken');
        if (!jwt) {
            throw new Error('Package jsonwebtoken seems not to be installed, please do `npm i -S jsonwebtoken and retry`');
        }
        return new jwtTokenAuthenticationProvider_1.JwtTokenAuthenticationProvider(secret, jwt);
    }
    inMemoryAuthenticator() {
        return new memoryAuthenticator_1.MemoryAuthenticator();
    }
}
exports.Provider = Provider;
