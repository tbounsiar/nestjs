/// <reference types="node" />
import { WebAuthenticationProvider } from './webAuthenticationProvider';
/**
 * Class for WWW-Authenticate Basic implementation
 */
export declare class BasicWebAuthenticationProvider extends WebAuthenticationProvider {
    /**
     * Set WWW-Authenticate Digest charset
     * @param charset {BufferEncoding}: charset value
     */
    charset(charset: BufferEncoding): this;
}
