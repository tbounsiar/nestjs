"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecurityExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
/**
 * @internal
 */
function createSecurityExceptionFilter() {
    let SecurityExceptionFilter = class SecurityExceptionFilter {
        catch(exception, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            // @ts-ignore
            if (response.finished) {
                return;
            }
            const request = ctx.getRequest();
            const status = exception.getStatus();
            response
                // @ts-ignore
                .status(status)
                .json({
                statusCode: status,
                message: exception.message,
                url: request.url,
            });
        }
    };
    SecurityExceptionFilter = __decorate([
        (0, common_1.Catch)(common_1.ForbiddenException, common_1.UnauthorizedException)
    ], SecurityExceptionFilter);
    return SecurityExceptionFilter;
}
exports.createSecurityExceptionFilter = createSecurityExceptionFilter;
