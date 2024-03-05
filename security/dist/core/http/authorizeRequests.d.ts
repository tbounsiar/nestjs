import { RequestMatcher, RequestMatcherBuilder } from './requestMatcher';
export declare class AuthorizeRequests {
    static builder(): AuthorizeRequestsBuilder;
    matchers(): Record<string, Record<number, string[]>>;
}
export declare class AuthorizeRequestsBuilder {
    requestMatcher(requestMatchers: RequestMatcher | RequestMatcherBuilder): this;
    build(): AuthorizeRequests;
}
