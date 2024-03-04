import { AuthenticationProvider } from '../abstract/authenticationProvider';
/**
 * Class for WWW-Authenticate implementation
 */
export declare abstract class WWWAuthenticationProvider extends AuthenticationProvider {
    /**
     * Set WWW-Authenticate realm
     * @param {string} realm realm value
     */
    realm(realm: string): this;
    /**
     * Activate WWW-Authenticate proxy authentication
     */
    proxy(): this;
}
