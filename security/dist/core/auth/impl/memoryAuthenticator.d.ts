import { Authenticator } from '../abstract/authenticator';
import { Authentication } from '../abstract/authentication';
export declare class MemoryAuthenticator extends Authenticator {
    /**
     * Add new User
     * @param user {MemoryAuthentication}: user
     */
    addUser(user: MemoryAuthentication): this;
}
export declare class MemoryAuthentication implements Authentication {
    static with(login: string, password: string): MemoryAuthentication;
    /**
     * Add roles to user
     * @param roles {string[]}: roles list
     */
    withRoles(...roles: string[]): MemoryAuthentication;
    /**
     * Add authorities to user
     * @param authorities {string[]}: authorities list
     */
    withAuthorities(...authorities: string[]): MemoryAuthentication;
}
