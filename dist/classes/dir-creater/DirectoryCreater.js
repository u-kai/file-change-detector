"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryCreater = void 0;
const fs_1 = require("fs");
class DirectoryCreater {
    constructor(directoryPath) {
        this.create = () => {
            (0, fs_1.mkdirSync)(this.directoryPath.relative, { recursive: true });
        };
        this.directoryPath = directoryPath;
    }
}
exports.DirectoryCreater = DirectoryCreater;
