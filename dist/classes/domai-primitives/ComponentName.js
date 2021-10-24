"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentName = void 0;
class ComponentName {
    constructor(componentName) {
        this.isBeginUppercase = (value) => {
            return /^[A-Z]*[a-z0-9]*$/.test(value);
        };
        if (this.isBeginUppercase(componentName) === false) {
            throw new Error("Component name's first charactor is must uppercase letter");
        }
        this.name = componentName;
    }
}
exports.ComponentName = ComponentName;
