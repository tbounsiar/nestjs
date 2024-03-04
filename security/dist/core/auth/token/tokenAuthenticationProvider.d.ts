import { WWWAuthenticationProvider } from '../impl/wwwAuthenticationProvider';
import { TokenParser } from './iface/tokenParser';
export declare class TokenAuthenticationProvider extends WWWAuthenticationProvider {
    tokenParser(tokenParser: TokenParser): TokenAuthenticationProvider;
}
