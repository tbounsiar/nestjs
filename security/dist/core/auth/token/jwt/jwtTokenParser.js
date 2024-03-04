"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenParser = void 0;
const tokenError_1 = require("../tokenError");
const requestAuthenticationImpl_1 = require("../../impl/requestAuthenticationImpl");
const jwtDataExtractorImpl_1 = require("./jwtDataExtractorImpl");
/**
 *
 */
class JwtTokenParser {
    constructor(secret, jwt) {
        this.secret = secret;
        this.jwt = jwt;
        /**
         * @internal
         */
        this._jwtDataExtractor = new jwtDataExtractorImpl_1.JwtDataExtractorImpl();
    }
    parse(token) {
        var _a, _b;
        if (token == undefined) {
            return new requestAuthenticationImpl_1.RequestAuthenticationImpl();
        }
        try {
            const decoded = this.jwt.verify(token, this.secret);
            const authentication = {
                username: (_a = this._jwtDataExtractor) === null || _a === void 0 ? void 0 : _a.getUsername(decoded),
                roles: (_b = this._jwtDataExtractor) === null || _b === void 0 ? void 0 : _b.getRoles(decoded),
                authorities: this._jwtDataExtractor.getAuthorities(decoded),
            };
            return new requestAuthenticationImpl_1.RequestAuthenticationImpl(authentication);
        }
        catch (error) {
            throw new tokenError_1.TokenError('Invalid Token', 'invalid_token', error.message);
        }
    }
    jwtDataExtractor(jwtAuthorization) {
        if (!jwtAuthorization) {
            return this._jwtDataExtractor;
        }
        this._jwtDataExtractor = jwtAuthorization;
        return this;
    }
}
exports.JwtTokenParser = JwtTokenParser;
