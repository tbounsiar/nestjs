"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SecurityModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityConfigBuilder = exports.SecurityConfig = exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const security_guard_1 = require("../guard/security.guard");
const login_controller_1 = require("../controller/login.controller");
const login_service_1 = require("../service/login.service");
const reflector_service_1 = require("@nestjs/core/services/reflector.service");
const provider_1 = require("../core/auth/provider");
const security_exception_filter_1 = require("../filter/security-exception.filter");
const authenticationProvider_1 = require("../core/auth/abstract/authenticationProvider");
const authenticator_1 = require("../core/auth/abstract/authenticator");
const authErrorHandling_1 = require("../core/auth/abstract/authErrorHandling");
const httpSecurity_1 = require("../core/http/httpSecurity");
const sessionAuthenticationProvider_1 = require("../core/auth/impl/sessionAuthenticationProvider");
const authenticationBuilder_1 = require("../core/auth/authenticationBuilder");
let SecurityModule = SecurityModule_1 = class SecurityModule {
    static forRoot(config) {
        const controllers = [];
        const authenticationProvider = config
            .authenticationBuilder()
            .authenticationProvider();
        const providers = [
            {
                provide: core_1.APP_FILTER,
                useClass: (0, security_exception_filter_1.createSecurityExceptionFilter)(),
            },
            {
                provide: core_1.APP_GUARD,
                useClass: security_guard_1.SecurityGuard,
            },
            {
                provide: authenticationProvider_1.AuthenticationProvider,
                useValue: authenticationProvider,
            },
            {
                provide: authenticator_1.Authenticator,
                useValue: config.authenticationBuilder().authenticator(),
            },
            {
                provide: authErrorHandling_1.AuthErrorHandling,
                useValue: config.authenticationBuilder().errorHandling(),
            },
            {
                provide: httpSecurity_1.HttpSecurity,
                useValue: config.httpSecurity(),
            },
            reflector_service_1.Reflector,
        ];
        // @ts-ignore
        const exports = [];
        if (authenticationProvider.authenticateType() === authenticationProvider_1.AuthenticateType.FORM_LOGIN) {
            this.logger.warn(sessionAuthenticationProvider_1.sessionAndFormMessage);
            // this.logger.warn(`Be sure to set application session. app.use(session({secret: "secret"}));`);
            const formLogin = authenticationProvider.formLogin();
            providers.push({
                provide: sessionAuthenticationProvider_1.FormLogin,
                useValue: formLogin
            });
            if (formLogin.isDefaultEnabled()) {
                controllers.push((0, login_controller_1.createLoginController)(formLogin));
            }
            if (formLogin.isLoginService()) {
                providers.push(login_service_1.LoginService);
                exports.push(login_service_1.LoginService);
            }
        }
        return {
            module: SecurityModule_1,
            providers,
            exports,
            controllers,
            global: true,
        };
    }
};
exports.SecurityModule = SecurityModule;
/**
 * @internal
 * @private
 */
SecurityModule.logger = new common_1.Logger(SecurityModule_1.name);
exports.SecurityModule = SecurityModule = SecurityModule_1 = __decorate([
    (0, common_1.Module)({})
], SecurityModule);
class SecurityConfig {
    /**
     * @internal
     */
    constructor(
    /**
     * @internal
     */
    _httpSecurity, 
    /**
     * @internal
     */
    _authenticationBuilder) {
        this._httpSecurity = _httpSecurity;
        this._authenticationBuilder = _authenticationBuilder;
    }
    httpSecurity() {
        return this._httpSecurity;
    }
    authenticationBuilder() {
        return this._authenticationBuilder;
    }
    static builder() {
        return new SecurityConfigBuilder();
    }
}
exports.SecurityConfig = SecurityConfig;
class SecurityConfigBuilder {
    /**
     * @internal
     */
    constructor() {
        /**
         * @internal
         * @private
         */
        this._httpSecurity = new httpSecurity_1.HttpSecurity(this);
        /**
         * @internal
         * @private
         */
        this._authenticationBuilder = new authenticationBuilder_1.AuthenticationBuilder(this);
        /**
         * @internal
         * @private
         */
        this.provider = new provider_1.Provider(this._authenticationBuilder);
        this._authenticationBuilder.authenticationProvider(this.provider.basicAuthentication());
    }
    httpSecurity() {
        return this._httpSecurity;
    }
    authenticationBuilder() {
        return this._authenticationBuilder;
    }
    provide() {
        return this.provider;
    }
    build() {
        return new SecurityConfig(this._httpSecurity, this._authenticationBuilder);
    }
}
exports.SecurityConfigBuilder = SecurityConfigBuilder;
