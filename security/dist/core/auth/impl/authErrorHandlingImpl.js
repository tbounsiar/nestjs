"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthErrorHandlingImpl = void 0;
const common_1 = require("@nestjs/common");
const authErrorHandling_1 = require("../abstract/authErrorHandling");
/**
 * @internal
 */
class AuthErrorHandlingImpl extends authErrorHandling_1.AuthErrorHandling {
    forbidden(message) {
        return new common_1.ForbiddenException(message);
    }
    unauthorized(message) {
        return new common_1.UnauthorizedException(message);
    }
}
exports.AuthErrorHandlingImpl = AuthErrorHandlingImpl;
