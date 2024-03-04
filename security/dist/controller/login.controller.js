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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoginController = void 0;
const common_1 = require("@nestjs/common");
const login_page_service_1 = require("../service/login-page.service");
const sessionAuthenticationProvider_1 = require("../core/auth/impl/sessionAuthenticationProvider");
/**
 * @internal
 * @param formLogin
 */
const createLoginController = (formLogin) => {
    var LoginController_1;
    let LoginController = LoginController_1 = class LoginController {
        constructor(authenticationService) {
            this.authenticationService = authenticationService;
            this.logger = new common_1.Logger(LoginController_1.name);
        }
        page(request, response) {
            this.authenticationService.loginPage(request, response, formLogin);
        }
        login(request, response) {
            this.authenticationService.login(request, response, formLogin);
        }
        logout(request, response) {
            this.authenticationService.logout(request, response, formLogin);
        }
    };
    __decorate([
        (0, common_1.Get)(formLogin.loginPage() || sessionAuthenticationProvider_1.FormLogin.DEFAULT_LOGIN_PAGE),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "page", null);
    __decorate([
        (0, common_1.Post)(formLogin.loginUrl() || sessionAuthenticationProvider_1.FormLogin.DEFAULT_LOGIN_URL),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        (0, common_1.Post)(formLogin.logoutUrl() || sessionAuthenticationProvider_1.FormLogin.DEFAULT_LOGOUT_URL),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    LoginController = LoginController_1 = __decorate([
        (0, common_1.Controller)(),
        __metadata("design:paramtypes", [login_page_service_1.LoginPageService])
    ], LoginController);
    return LoginController;
};
exports.createLoginController = createLoginController;
