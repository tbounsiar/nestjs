import { JwtDataExtractor } from './jwtDataExtractor';
export declare class JwtDataExtractorImpl implements JwtDataExtractor {
    getAuthorities(decoded: any): string[];
    getRoles(decoded: any): string[];
    getUsername(decoded: any): string;
}
