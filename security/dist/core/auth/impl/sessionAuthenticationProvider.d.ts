import { RequestAuthentication } from '../abstract/requestAuthentication';
import { RequestAuthenticationProvider } from '../abstract/requestAuthenticationProvider';
import { Authentication } from '../abstract/authentication';
export interface Credentials {
    username: string;
    password: string;
}
export declare class SessionAuthenticationProvider extends RequestAuthenticationProvider<Credentials> {
    formLogin(): FormLogin;
    formLogin(formLogin: FormLogin): SessionAuthenticationProvider;
    protected buildAuthentication(request: any): RequestAuthentication;
    setAuthentication(request: any, authentication: Authentication): void;
}
export declare class FormLogin {
    private loginService;
    static new(): FormLogin;
    loginPage(loginPage: string): FormLogin;
    loginUrl(loginUrl: string): FormLogin;
    logoutUrl(logoutUrl: string): FormLogin;
    redirectUrl(redirectUrl: string): FormLogin;
    disableDefault(): this;
    isLoginService(): boolean;
    disableLoginService(): this;
}
