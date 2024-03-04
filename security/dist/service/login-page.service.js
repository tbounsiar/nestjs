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
exports.LoginPageService = void 0;
const common_1 = require("@nestjs/common");
const template_1 = require("../core/utils/template");
const authenticationProvider_1 = require("../core/auth/abstract/authenticationProvider");
const authenticator_1 = require("../core/auth/abstract/authenticator");
const sessionAuthenticationProvider_1 = require("../core/auth/impl/sessionAuthenticationProvider");
/**
 * @internal
 */
let LoginPageService = class LoginPageService {
    constructor(authenticationProvider, authenticator) {
        this.authenticationProvider = authenticationProvider;
        this.authenticator = authenticator;
    }
    loginPage(request, response, formLogin) {
        const requestAuthentication = this.authenticationProvider.getAuthentication(request);
        if (requestAuthentication.isAuthenticated()) {
            this.redirect(request, response, formLogin);
        }
        else {
            let loginUrl = formLogin.loginUrl() || sessionAuthenticationProvider_1.FormLogin.DEFAULT_LOGIN_URL;
            if (!formLogin.redirectUrl() && request.query.from) {
                loginUrl += '?from=' + request.query.from;
            }
            response.type('text/html');
            response.send((0, template_1.loginTemplate)(loginUrl));
        }
    }
    login(request, response, formLogin) {
        var _a, _b;
        const authentication = this.authenticator.authenticate((_a = request.body) === null || _a === void 0 ? void 0 : _a.login, (_b = request.body) === null || _b === void 0 ? void 0 : _b.password);
        this.authenticationProvider.setAuthentication(request, authentication);
        this.redirect(request, response, formLogin);
    }
    logout(request, response, formLogin) {
        this.authenticationProvider.setAuthentication(request, null);
        this.redirect(request, response, formLogin);
    }
    redirect(request, response, formLogin) {
        var _a;
        let redirect = '/';
        if (formLogin.redirectUrl()) {
            redirect = formLogin.redirectUrl();
        }
        else if ((_a = request.query) === null || _a === void 0 ? void 0 : _a.from) {
            redirect = request.query.from;
        }
        response.status(302).redirect(redirect);
    }
};
exports.LoginPageService = LoginPageService;
exports.LoginPageService = LoginPageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [authenticationProvider_1.AuthenticationProvider,
        authenticator_1.Authenticator])
], LoginPageService);
