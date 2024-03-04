import { TokenAuthenticationProvider } from '../tokenAuthenticationProvider';
import { JwtTokenParser } from './jwtTokenParser';
export declare class JwtTokenAuthenticationProvider extends TokenAuthenticationProvider {
    jwtTokenParser(): JwtTokenParser;
}
