"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionFactory = void 0;
const AnyExtension_1 = require("./AnyExtension");
class ExtensionFactory {
    constructor() {
        this.createExtension = (extension) => {
            return new AnyExtension_1.AnyExtension(extension);
        };
    }
}
exports.ExtensionFactory = ExtensionFactory;
