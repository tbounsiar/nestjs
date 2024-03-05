import { AuthenticationProvider } from './authenticationProvider';
import { Authentication } from './authentication';
export declare abstract class RequestAuthenticationProvider<Credentials> extends AuthenticationProvider {
    /**
     * Set Authentication to request
     * @param request {any}: The http request
     * @param authentication {Authentication}:  the authentication
     */
    abstract setAuthentication(request: any, authentication: Authentication): void;
    credentialsExtractor(): CredentialsExtractor<Credentials>;
    credentialsExtractor(extractor: CredentialsExtractor<Credentials>): this;
}
export interface CredentialsExtractor<Credentials> {
    extract(request: any): Credentials;
}
