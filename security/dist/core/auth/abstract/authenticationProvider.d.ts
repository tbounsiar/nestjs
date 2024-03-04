import { RequestAuthentication } from './requestAuthentication';
/**
 * Interface to implement an Authentication Provider
 */
export declare abstract class AuthenticationProvider {
    /**
     * Get Authentication from request
     * @param request {any}: The http request
     */
    abstract getAuthentication(request: any): RequestAuthentication;
}
