"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenAuthenticationProvider = void 0;
const tokenAuthenticationProvider_1 = require("../tokenAuthenticationProvider");
const jwtTokenParser_1 = require("./jwtTokenParser");
class JwtTokenAuthenticationProvider extends tokenAuthenticationProvider_1.TokenAuthenticationProvider {
    /**
     * @internal
     */
    constructor(secret, jwt) {
        super();
        this._jwtTokenParser = new jwtTokenParser_1.JwtTokenParser(secret, jwt);
        this.tokenParser(this._jwtTokenParser);
    }
    jwtTokenParser() {
        return this._jwtTokenParser;
    }
}
exports.JwtTokenAuthenticationProvider = JwtTokenAuthenticationProvider;
