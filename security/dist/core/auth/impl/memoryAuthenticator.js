"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryAuthentication = exports.MemoryAuthenticator = void 0;
const authenticator_1 = require("../abstract/authenticator");
class MemoryAuthenticator extends authenticator_1.Authenticator {
    constructor() {
        super(...arguments);
        /**
         * @internal
         * @private
         */
        this.store = {};
    }
    /**
     * @internal
     * @param login
     * @param password
     */
    authenticate(login, password) {
        if (login) {
            const user = this.store[login];
            if (user && (!password || user.password === password)) {
                return user;
            }
        }
        return undefined;
    }
    /**
     * Add new User
     * @param user {MemoryAuthentication}: user
     */
    addUser(user) {
        this.store[user.username] = user;
        return this;
    }
}
exports.MemoryAuthenticator = MemoryAuthenticator;
class MemoryAuthentication {
    /**
     * @internal
     * @param username
     * @param password
     */
    constructor(
    /**
     * @internal
     */
    username, 
    /**
     * @internal
     */
    password) {
        this.username = username;
        this.password = password;
        /**
         * @internal
         * @private
         */
        this.roles = [];
        /**
         * @internal
         * @private
         */
        this.authorities = [];
    }
    static with(login, password) {
        return new MemoryAuthentication(login, password);
    }
    /**
     * Add roles to user
     * @param roles {string[]}: roles list
     */
    withRoles(...roles) {
        this.roles = roles;
        return this;
    }
    /**
     * Add authorities to user
     * @param authorities {string[]}: authorities list
     */
    withAuthorities(...authorities) {
        this.authorities = authorities;
        return this;
    }
}
exports.MemoryAuthentication = MemoryAuthentication;
