"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryCreater = void 0;
const fs_1 = require("fs");
class DirectoryCreater {
    constructor(directoryPath) {
        this.create = () => {
            (0, fs_1.mkdir)(this.directoryPath.relative, { recursive: true }, (err) => console.log(err));
        };
        this.isExist = () => {
            return (0, fs_1.existsSync)(this.directoryPath.relative);
        };
        this.directoryPath = directoryPath;
    }
}
exports.DirectoryCreater = DirectoryCreater;
