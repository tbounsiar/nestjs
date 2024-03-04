import { RequestMatcher, RequestMatcherBuilder } from './requestMatcher';
export declare class AuthorizeRequests {
    static builder(): AuthorizeRequestsBuilder;
    matchers(): RequestMatcher[];
}
export declare class AuthorizeRequestsBuilder {
    requestMatcher(requestMatchers: RequestMatcher | RequestMatcherBuilder): this;
    build(): AuthorizeRequests;
}
