import { RequestAuthentication } from '../abstract/requestAuthentication';
import { RequestAuthenticationProvider } from '../abstract/requestAuthenticationProvider';
import { Authentication } from '../abstract/authentication';
export declare class SessionAuthenticationProvider extends RequestAuthenticationProvider {
    formLogin(): FormLogin;
    formLogin(formLogin: FormLogin): SessionAuthenticationProvider;
    getAuthentication(request: any): RequestAuthentication;
    setAuthentication(request: any, authentication: Authentication): void;
}
export declare class FormLogin {
    static new(): FormLogin;
    loginPage(loginPage: string): FormLogin;
    loginUrl(loginUrl: string): FormLogin;
    logoutUrl(logoutUrl: string): FormLogin;
    redirectUrl(redirectUrl: string): FormLogin;
}
