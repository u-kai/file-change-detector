"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyExtension = void 0;
class AnyExtension {
    constructor(extension) {
        this.extensionMaxLength = 10;
        this.extensionMinLength = 3;
        this.isNotExtension = (value) => {
            if (this.isRange(value) === false) {
                return true;
            }
            if (this.isExtensionWithSomething(value)) {
                return true;
            }
            return false;
        };
        this.hasPreviousDot = (value) => {
            return /^\.[a-z]+$/.test(value);
        };
        this.isExtensionWithSomething = (value) => {
            return /.\..+$/.test(value);
        };
        this.isRange = (value) => {
            return value.length >= this.extensionMinLength && value.length <= this.extensionMaxLength;
        };
        this.addPreviousDot = (value) => '.' + value;
        if (this.isNotExtension(extension)) {
            throw new Error(`${extension} is not extension `);
        }
        if (this.hasPreviousDot(extension) === false) {
            this.extension = this.addPreviousDot(extension);
            return this;
        }
        this.extension = extension;
    }
}
exports.AnyExtension = AnyExtension;
