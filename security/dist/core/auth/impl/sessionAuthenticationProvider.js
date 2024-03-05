"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormLogin = exports.SessionAuthenticationProvider = exports.sessionAndFormMessage = void 0;
const requestAuthenticationImpl_1 = require("./requestAuthenticationImpl");
const requestAuthenticationProvider_1 = require("../abstract/requestAuthenticationProvider");
/**
 * @internal
 */
exports.sessionAndFormMessage = `Your NestJS application is using session authentication. Please ensure that session support is properly configured. please see https://docs.nestjs.com/techniques/session`;
class SessionAuthenticationProvider extends requestAuthenticationProvider_1.RequestAuthenticationProvider {
    constructor() {
        super(...arguments);
        /**
         * @internal
         * @private
         */
        this._formLogin = FormLogin.new();
    }
    formLogin(formLogin) {
        if (formLogin === undefined) {
            return this._formLogin;
        }
        this._formLogin = formLogin;
        return this;
    }
    buildAuthentication(request) {
        if (!request.session) {
            throw new Error(exports.sessionAndFormMessage);
        }
        return new requestAuthenticationImpl_1.RequestAuthenticationImpl(request.session.authentication);
    }
    setAuthentication(request, authentication) {
        if (!request.session) {
            throw new Error(exports.sessionAndFormMessage);
        }
        if (!authentication) {
            delete request.session.authentication;
            return;
        }
        request.session.authentication = authentication;
    }
}
exports.SessionAuthenticationProvider = SessionAuthenticationProvider;
class FormLogin {
    /**
     * @internal
     */
    constructor() {
        /**
         * @internal
         * @private
         */
        this.defaultEnabled = true;
        this.loginService = true;
    }
    static new() {
        return new this();
    }
    loginPage(loginPage) {
        if (loginPage === undefined) {
            return this._loginPage;
        }
        this._loginPage = loginPage;
        return this;
    }
    loginUrl(loginUrl) {
        if (loginUrl === undefined) {
            return this._loginUrl;
        }
        this._loginUrl = loginUrl;
        return this;
    }
    logoutUrl(logoutUrl) {
        if (logoutUrl === undefined) {
            return this._logoutUrl;
        }
        this._logoutUrl = logoutUrl;
        return this;
    }
    redirectUrl(redirectUrl) {
        if (redirectUrl === undefined) {
            return this._redirectUrl;
        }
        this._redirectUrl = redirectUrl;
        return this;
    }
    /**
     * @internal
     */
    isDefaultEnabled() {
        return this.defaultEnabled;
    }
    disableDefault() {
        this.defaultEnabled = false;
        return this;
    }
    isLoginService() {
        return this.loginService;
    }
    disableLoginService() {
        this.loginService = false;
        return this;
    }
}
exports.FormLogin = FormLogin;
/**
 * @internal
 */
FormLogin.DEFAULT_LOGIN_PAGE = '/page/login';
/**
 * @internal
 */
FormLogin.DEFAULT_LOGIN_URL = '/auth/login';
/**
 * @internal
 */
FormLogin.DEFAULT_LOGOUT_URL = '/auth/logout';
