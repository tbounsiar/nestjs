import { AuthorizeRequests, AuthorizeRequestsBuilder } from './authorizeRequests';
import { SecurityConfigBuilder } from '../../module/security.module';
export declare class HttpSecurity {
    authorize(authorizeRequests: AuthorizeRequests | AuthorizeRequestsBuilder): this;
    and(): SecurityConfigBuilder;
}
