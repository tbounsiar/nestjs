/**
 * Interface to implement a new Request Authentication
 */
export interface RequestAuthentication {
    /**
     * Check if authentication has an authority
     * @param authority {string}: The authority
     */
    hasAuthority(authority: string): boolean;
    /**
     * Check if authentication has any of authorities
     * @param authorities {string[]}: The authorities
     */
    hasAnyAuthorities(...authorities: string[]): boolean;
    /**
     * Check if role has an authority
     * @param role {string}: The role
     */
    hasRole(role: string): boolean;
    /**
     * Check if authentication has any of roles
     * @param roles {string[]}: The roles
     */
    hasAnyRoles(...roles: string[]): boolean;
    /**
     * Check if Http Request is authenticated
     */
    isAuthenticated(): boolean;
}
