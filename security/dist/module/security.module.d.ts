import { DynamicModule } from '@nestjs/common';
import { Provider } from '../core/auth/provider';
import { HttpSecurity } from '../core/http/httpSecurity';
import { AuthenticationBuilder } from '../core/auth/authenticationBuilder';
export declare class SecurityModule {
    static forRoot(config: SecurityConfig): DynamicModule;
}
export declare class SecurityConfig {
    httpSecurity(): HttpSecurity;
    authenticationBuilder(): AuthenticationBuilder;
    static builder(): SecurityConfigBuilder;
}
export declare class SecurityConfigBuilder {
    httpSecurity(): HttpSecurity;
    authenticationBuilder(): AuthenticationBuilder;
    provide(): Provider;
    build(): SecurityConfig;
}
