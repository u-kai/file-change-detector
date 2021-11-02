"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorybookWriter = void 0;
const fs_1 = require("fs");
const ASBJson_1 = require("./ASBJson");
class StorybookWriter {
    constructor(componentName, componentFile, pathParser) {
        this.write = () => {
            if (this.isExistStorybooks()) {
                return;
            }
            (0, fs_1.writeFileSync)(this.srcFilePathToStorybooksFilePath(), this.makeContents());
            console.log(`Create ${this.srcFilePathToStorybooksFilePath()} is Success!!`);
        };
        this.makeContents = () => {
            const importStatement = `import {${this.componentName.name}} from "${this.getImportStatementPath()}"`;
            const content = `${importStatement}
import {action} from "@storybook/addon-actions"
export default {
    component: ${this.componentName.name},
    title: '${this.componentName.name}'
}
export const Storybook = () => <${this.componentName.name}>auto create</${this.componentName.name}>`;
            return content;
        };
        this.getImportStatementPath = () => {
            const importStatementPath = this.pathParser.getImportStatementPath(this.srcFilePathToStorybooksFilePath(), this.componentFile.directoryPath + this.componentFile.filename);
            return importStatementPath;
        };
        this.srcFilePathToStorybooksFilePath = () => {
            const src = this.asbJson.srcTop;
            const story = this.asbJson.storybookTop;
            const replaceToStorybooksDir = this.componentFile.directoryPath.replace(src, story);
            return replaceToStorybooksDir + this.componentFile.filenameExcludeExtension + '.stories.tsx';
        };
        this.isExistStorybooks = () => {
            return (0, fs_1.existsSync)(this.srcFilePathToStorybooksFilePath());
        };
        this.componentName = componentName;
        this.componentFile = componentFile;
        this.asbJson = new ASBJson_1.ASBJson().value;
        this.pathParser = pathParser;
    }
}
exports.StorybookWriter = StorybookWriter;
