"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenError = void 0;
/**
 * @internal
 */
class TokenError extends Error {
    constructor(message, name, description) {
        super(message);
        this.description = description;
        this.name = name;
    }
}
exports.TokenError = TokenError;
