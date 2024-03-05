import { RequestAuthentication } from './requestAuthentication';
export declare const Authentication: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
/**
 * Interface to implement an Authentication Provider
 */
export declare abstract class AuthenticationProvider {
    getAuthentication(request: any): RequestAuthentication;
    /**
     * Build Authentication using request
     * @param request
     * @protected
     */
    protected abstract buildAuthentication(request: any): RequestAuthentication;
}
