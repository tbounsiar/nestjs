"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestAuthenticationProvider = void 0;
const authenticationProvider_1 = require("./authenticationProvider");
class RequestAuthenticationProvider extends authenticationProvider_1.AuthenticationProvider {
    credentialsExtractor(extractor) {
        if (extractor === undefined) {
            return this._credentialsExtractor;
        }
        this._credentialsExtractor = extractor;
        return this;
    }
}
exports.RequestAuthenticationProvider = RequestAuthenticationProvider;
