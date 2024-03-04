"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtDataExtractorImpl = void 0;
class JwtDataExtractorImpl {
    getAuthorities(decoded) {
        var _a;
        return ((_a = decoded === null || decoded === void 0 ? void 0 : decoded.claims) === null || _a === void 0 ? void 0 : _a.authorities) || [];
    }
    getRoles(decoded) {
        var _a;
        return ((_a = decoded === null || decoded === void 0 ? void 0 : decoded.claims) === null || _a === void 0 ? void 0 : _a.roles) || [];
    }
    getUsername(decoded) {
        return decoded === null || decoded === void 0 ? void 0 : decoded.username;
    }
}
exports.JwtDataExtractorImpl = JwtDataExtractorImpl;
