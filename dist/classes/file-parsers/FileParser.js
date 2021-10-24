"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileParser = void 0;
class FileParser {
    constructor(file) {
        this.isMatchExtension = (extension) => {
            const wantExtension = extension.extension;
            const thisExtension = this.file.extension.extension;
            return wantExtension === thisExtension;
        };
        this.file = file;
    }
}
exports.FileParser = FileParser;
