"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASBJson = void 0;
const fs_1 = require("fs");
class ASBJson {
    constructor() {
        this.filename = './auto-sb.json';
        this.isAutoStorybookJson = (value) => {
            return value.srcTop && value.storybookTop;
        };
        this.removeRelativeHead = (path) => {
            return path.substr('./'.length);
        };
        this.hasRelativeHead = (path) => {
            return /^\.\/[a-z][a-z0-9A-Z]+/.test(path);
        };
        this.isInvalidTail = (path) => {
            return /[\*\.\/]$/.test(path);
        };
        const content = (0, fs_1.readFileSync)(this.filename, 'utf-8');
        const parseContent = JSON.parse(content);
        if (this.isAutoStorybookJson(parseContent) === false) {
            throw new Error('auto-sb.json filed is must implements srcTop and storybookTop');
        }
        if (this.isAutoStorybookJson(parseContent)) {
            const { srcTop, storybookTop } = parseContent;
            if (this.isInvalidTail(srcTop) === true) {
                throw new Error(`invalid srcTop path. ${srcTop} tail is not * / . `);
            }
            if (this.isInvalidTail(storybookTop) === true) {
                throw new Error(`invalid storybookTop path. ${storybookTop} tail is not * / . `);
            }
            if (this.hasRelativeHead(srcTop)) {
                parseContent.srcTop = this.removeRelativeHead(parseContent.srcTop);
            }
            if (this.hasRelativeHead(storybookTop)) {
                parseContent.storybookTop = this.removeRelativeHead(parseContent.storybookTop);
            }
            this.value = parseContent;
            return this;
        }
        throw new Error('unexpect error from ASBJSON');
    }
}
exports.ASBJson = ASBJson;
