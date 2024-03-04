"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Decode = exports.base64Encode = exports.md5 = void 0;
const crypto = __importStar(require("crypto"));
/**
 * @internal
 * @param input
 * @param algorithm
 */
function hash(input, algorithm) {
    const h = crypto.createHash(algorithm);
    h.update(input);
    return h.digest('hex');
}
/**
 * @internal
 * @param input
 */
function md5(input) {
    return hash(input, 'MD5');
}
exports.md5 = md5;
/**
 * @internal
 * @param input
 */
function base64Encode(input) {
    return Buffer.from(input, 'utf8').toString('base64');
}
exports.base64Encode = base64Encode;
/**
 * @internal
 * @param input
 * @param encoding
 */
function base64Decode(input, encoding = 'utf-8') {
    return Buffer.from(input, 'base64').toString(encoding);
}
exports.base64Decode = base64Decode;
