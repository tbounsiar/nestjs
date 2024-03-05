import { TokenParser } from '../iface/tokenParser';
import { RequestAuthentication } from '../../abstract/requestAuthentication';
import { JwtDataExtractor } from './jwtDataExtractor';
/**
 *
 */
export declare class JwtTokenParser implements TokenParser {
    private secret;
    private jwt;
    constructor(secret: string, jwt: any);
    parse(token: string): RequestAuthentication;
    dataExtractor(jwtAuthorization: JwtDataExtractor): JwtTokenParser;
    dataExtractor(): JwtDataExtractor;
}
