"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestAuthenticationImpl = void 0;
/**
 * @internal
 */
class RequestAuthenticationImpl {
    constructor(authentication) {
        this.authentication = authentication;
        this.roles = [];
        this.authorities = [];
        if (authentication) {
            this.username = authentication.username;
            this.authorities = authentication.authorities || [];
            this.roles = authentication.roles || [];
        }
    }
    getUsername() {
        return this.username;
    }
    hasAuthority(authority) {
        return this.authorities.indexOf(authority) !== -1;
    }
    hasAnyAuthorities(...authorities) {
        for (const authority of authorities) {
            if (this.hasAuthority(authority)) {
                return true;
            }
        }
        return false;
    }
    hasRole(role) {
        return this.roles.indexOf(role) !== -1;
    }
    hasAnyRoles(...roles) {
        for (const role of roles) {
            if (this.hasRole(role)) {
                return true;
            }
        }
        return false;
    }
    isAuthenticated() {
        return !!this.authentication;
    }
}
exports.RequestAuthenticationImpl = RequestAuthenticationImpl;
