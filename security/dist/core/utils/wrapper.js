"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
/**
 * @internal
 */
class Wrapper {
    constructor(o) {
        this.o = o;
    }
    get() {
        return this.o;
    }
    set(o) {
        this.o = o;
    }
}
exports.Wrapper = Wrapper;
