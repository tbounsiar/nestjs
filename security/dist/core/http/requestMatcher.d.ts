import { RequestMethod } from '@nestjs/common';
export declare class RequestMatcher {
    methods(): RequestMethod[];
    regex(): (string | RegExp)[];
    permissions(): string[];
    static builder(): RequestMatcherBuilder;
}
export declare class RequestMatcherBuilder {
    requestMatcher(...regex: (string | RegExp)[]): this;
    withMethod(...methods: RequestMethod[]): this;
    permitAll(): this;
    hasRole(role: string): this;
    hasAnyRoles(...roles: string[]): this;
    hasAuthority(authority: string): this;
    hasAnyAuthorities(...authorities: string[]): this;
    anyRequest(): this;
    build(): RequestMatcher;
}
