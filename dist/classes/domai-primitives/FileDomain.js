"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDomain = void 0;
const path = require("path");
const ExtensionFactory_1 = require("./ExtensionFactory");
class FileDomain {
    constructor(filePath) {
        this.hasExtension = (filePath) => {
            return /^.*\./.test(filePath);
        };
        this.isWithPath = (filePath) => {
            return /[\/]/.test(filePath);
        };
        this.createExtension = (filePath) => {
            const extensionString = filePath.substr(this.getBeginExtensionIndex(filePath));
            const extension = new ExtensionFactory_1.ExtensionFactory().createExtension(extensionString);
            return extension;
        };
        this.createDirectoryPath = (filePath, filename) => {
            const beginFileNameIndex = filePath.search(filename);
            if (beginFileNameIndex === 0) {
                return '';
            }
            const directoryPath = filePath.substr(0, beginFileNameIndex);
            return directoryPath;
        };
        this.createFileNameExcludeExtension = (filename) => filename.substr(0, this.getBeginExtensionIndex(filename));
        this.getBeginExtensionIndex = (filePath) => filePath.search(/\.[a-z0-9]*$/);
        if (this.hasExtension(filePath) === false) {
            throw new Error('this file is not extension');
        }
        this.extension = this.createExtension(filePath);
        if (this.isWithPath(filePath)) {
            const filename = path.basename(filePath);
            this.filename = filename;
            this.directoryPath = this.createDirectoryPath(filePath, this.filename);
            this.filenameExcludeExtension = this.createFileNameExcludeExtension(this.filename);
            return this;
        }
        this.filename = filePath;
        this.directoryPath = this.createDirectoryPath(filePath, this.filename);
        this.filenameExcludeExtension = this.createFileNameExcludeExtension(this.filename);
    }
}
exports.FileDomain = FileDomain;
