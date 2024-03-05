"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const preAuthorize_decorator_1 = require("./decorator/preAuthorize.decorator");
const authenticationProvider_1 = require("../core/auth/abstract/authenticationProvider");
const httpSecurity_1 = require("../core/http/httpSecurity");
const authErrorHandling_1 = require("../core/auth/abstract/authErrorHandling");
const sessionAuthenticationProvider_1 = require("../core/auth/impl/sessionAuthenticationProvider");
const requestMatcher_1 = require("../core/http/requestMatcher");
const utils_1 = require("../core/utils/utils");
/**
 * @internal
 */
let SecurityGuard = class SecurityGuard {
    constructor(reflector, authenticationProvider, httpSecurity, authErrorHandling) {
        this.reflector = reflector;
        this.authenticationProvider = authenticationProvider;
        this.httpSecurity = httpSecurity;
        this.authErrorHandling = authErrorHandling;
        if (this.authenticationProvider.authenticateType() ===
            authenticationProvider_1.AuthenticateType.FORM_LOGIN) {
            const formLogin = this.authenticationProvider.formLogin();
            const loginUrls = [
                new RegExp(formLogin.loginPage() || sessionAuthenticationProvider_1.FormLogin.DEFAULT_LOGIN_PAGE).source,
                new RegExp(formLogin.loginUrl() || sessionAuthenticationProvider_1.FormLogin.DEFAULT_LOGIN_URL).source,
                new RegExp(formLogin.logoutUrl() || sessionAuthenticationProvider_1.FormLogin.DEFAULT_LOGOUT_URL).source,
            ];
            this.loginRegex = (0, utils_1.pathToRegex)(...loginUrls);
        }
    }
    canActivate(context) {
        if (this.authenticationProvider.authenticateType() ===
            authenticationProvider_1.AuthenticateType.FORM_LOGIN &&
            this.isLoginForm(context)) {
            return true;
        }
        if (this.validateMatcher(context)) {
            return true;
        }
        return false;
    }
    isLoginForm(context) {
        const request = context.switchToHttp().getRequest();
        const path = request.originalUrl;
        return this.loginRegex.test(path);
    }
    validateMatcher(context) {
        const request = context.switchToHttp().getRequest();
        const method = common_1.RequestMethod[request.method];
        const path = request.originalUrl;
        const permissions = this.httpSecurity.getPermission(path, method);
        if (permissions.length > 0) {
            const permitAll = permissions.find(permission => permission === requestMatcher_1.RequestMatcher.PERMIT_ALL);
            if (permitAll) {
                return true;
            }
            const expressions = [];
            const matchExpression = permissions.map(permission => `authentication.${permission}`).join(' || ');
            if (matchExpression) {
                expressions.push(matchExpression);
            }
            const decoratorExpression = this.getDecoratorExpression(context);
            if (decoratorExpression) {
                expressions.push(decoratorExpression);
            }
            let expression = undefined;
            if (expressions.length > 0) {
                expression = expressions.length > 1 ? expressions.map(exp => `(${exp})`).join(' && ') : expressions[0];
            }
            return this.validatePermission(context, expression);
        }
        else {
            return this.validateDecorator(context);
        }
    }
    validatePermission(context, expression) {
        let errorHandler = null;
        let redirect = null;
        const authenticateType = this.authenticationProvider.authenticateType();
        const request = context.switchToHttp().getRequest();
        switch (authenticateType) {
            case authenticationProvider_1.AuthenticateType.BASIC:
            case authenticationProvider_1.AuthenticateType.DIGEST:
            case authenticationProvider_1.AuthenticateType.BEARER:
                errorHandler = (error) => {
                    const [key, value] = this.authenticationProvider.getAskHeader(error);
                    const response = context.switchToHttp().getResponse();
                    response.header(key, value);
                    // response.status(401).send(this.authErrorHandling.unauthorized().getResponse());
                };
                break;
            case authenticationProvider_1.AuthenticateType.FORM_LOGIN:
                const formLogin = this.authenticationProvider.formLogin();
                redirect = () => {
                    const response = context.switchToHttp().getResponse();
                    response
                        .status(302)
                        .redirect(`${formLogin.loginPage() || sessionAuthenticationProvider_1.FormLogin.DEFAULT_LOGIN_PAGE}?from=${request.originalUrl}`);
                };
                break;
            default:
                break;
        }
        try {
            const authentication = this.authenticationProvider.getAuthentication(request);
            if (!authentication.isAuthenticated()) {
                if (redirect) {
                    redirect();
                    return;
                }
                // @ref *
                throw new common_1.UnauthorizedException();
            }
            if (!expression || eval(expression)) {
                return true;
            }
        }
        catch (error) {
            // check if throwed ar @ref *
            const isUnauthorizedException = error instanceof common_1.UnauthorizedException;
            if (errorHandler) {
                errorHandler(isUnauthorizedException ? undefined : error);
            }
            throw isUnauthorizedException ? error : this.authErrorHandling.unauthorized();
        }
        throw this.authErrorHandling.forbidden();
    }
    getDecoratorExpression(context) {
        const authorization = this.reflector.get(preAuthorize_decorator_1.PreAuthorize, context.getHandler());
        if (authorization) {
            return (0, preAuthorize_decorator_1.getExpression)(authorization);
        }
        return undefined;
    }
    validateDecorator(context) {
        const expression = this.getDecoratorExpression(context);
        if (expression) {
            return this.validatePermission(context, expression);
        }
        return this.validatePermission(context);
    }
};
exports.SecurityGuard = SecurityGuard;
exports.SecurityGuard = SecurityGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        authenticationProvider_1.AuthenticationProvider,
        httpSecurity_1.HttpSecurity,
        authErrorHandling_1.AuthErrorHandling])
], SecurityGuard);
