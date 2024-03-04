import { AuthenticationProvider } from './abstract/authenticationProvider';
import { Authenticator } from './abstract/authenticator';
import { AuthErrorHandling } from './abstract/authErrorHandling';
import { SecurityConfigBuilder } from '../../module/security.module';
export declare class AuthenticationBuilder {
    errorHandling(): AuthErrorHandling;
    errorHandling(errorHandling: AuthErrorHandling): AuthenticationBuilder;
    authenticationProvider(): AuthenticationProvider;
    authenticationProvider(authenticationProvider: AuthenticationProvider): AuthenticationBuilder;
    authenticator(): Authenticator;
    authenticator(authenticator: Authenticator): AuthenticationBuilder;
    and(): SecurityConfigBuilder;
}
