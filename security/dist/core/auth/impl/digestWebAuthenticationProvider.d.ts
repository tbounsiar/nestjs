import { WebAuthenticationProvider } from './webAuthenticationProvider';
export type DigestAlgorithm = 'MD5' | 'MD5-sess';
/**
 * Class for WWW-Authenticate Digest implementation
 */
export declare class DigestWebAuthenticationProvider extends WebAuthenticationProvider {
    /**
     * Set WWW-Authenticate Digest domain
     * @param domain {string}: domain value
     */
    domain(domain: string): this;
    /**
     * Activate WWW-Authenticate Digest opaque
     */
    opaque(): this;
    /**
     * Set WWW-Authenticate Digest algorithm
     * @param algorithm {DigestAlgorithm}: algorithm value
     */
    algorithm(algorithm: DigestAlgorithm): this;
    /**
     * Set WWW-Authenticate Digest qop 'auth'
     */
    qop(): this;
}
