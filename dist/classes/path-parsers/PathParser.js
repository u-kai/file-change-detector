"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathParser = void 0;
const path = require("path");
class PathParser {
    constructor(topPath = '.') {
        this.relative = (distPath) => {
            const relative = path.relative(this.topPath, distPath);
            return relative;
        };
        this.relativeTwo = (fromPath, toPath) => {
            const relative = path.relative(fromPath, toPath);
            return relative;
        };
        this.getImportStatementPath = (importFilePath, exportFilePath) => {
            const relative = this.relativeTwo(importFilePath, exportFilePath);
            const beginExtensionIndex = relative.search(/\.[a-z]+$/);
            const importStatementPath = relative.substr(0, beginExtensionIndex);
            const removeRelativeHead = importStatementPath.substr('../'.length);
            return removeRelativeHead;
        };
        this.getDirectories = (filePath) => {
            const beginFilePathIndex = filePath.search(/\/[a-zA-Z]+[a-zA-Z0-9]+\.[a-z]+$/);
            const directories = filePath.substr(0, beginFilePathIndex);
            return directories;
        };
        this.topPath = topPath;
    }
}
exports.PathParser = PathParser;
