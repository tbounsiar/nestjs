import { RequestMethod } from '@nestjs/common';
export declare class RequestMatcher {
    static builder(): RequestMatcherBuilder;
}
export declare class RequestMatcherBuilder {
    requestMatcher(...regex: (string | RegExp)[]): this;
    withMethod(method: RequestMethod): this;
    permitAll(): this;
    hasRole(role: string): this;
    hasAnyRoles(...roles: string[]): this;
    hasAuthority(authority: string): this;
    hasAnyAuthorities(...authorities: string[]): this;
    anyRequest(): this;
    build(): RequestMatcher;
}
