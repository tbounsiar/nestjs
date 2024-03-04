import { SessionAuthenticationProvider } from './impl/sessionAuthenticationProvider';
import { BasicWebAuthenticationProvider } from './impl/basicWebAuthenticationProvider';
import { DigestWebAuthenticationProvider } from './impl/digestWebAuthenticationProvider';
import { TokenAuthenticationProvider } from './token/tokenAuthenticationProvider';
import { JwtTokenAuthenticationProvider } from './token/jwt/jwtTokenAuthenticationProvider';
import { MemoryAuthenticator } from './impl/memoryAuthenticator';
export declare class Provider {
    sessionAuthentication(): SessionAuthenticationProvider;
    basicAuthentication(): BasicWebAuthenticationProvider;
    digestAuthentication(): DigestWebAuthenticationProvider;
    tokenAuthentication(): TokenAuthenticationProvider;
    jwtTokenAuthentication(secret: string): JwtTokenAuthenticationProvider;
    inMemoryAuthenticator(): MemoryAuthenticator;
}
