"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCreateStorybook = void 0;
const DirectoryCreater_1 = require("../../dir-creater/DirectoryCreater");
const ComponentFilePath_1 = require("../../domai-primitives/ComponentFilePath");
const ComponentName_1 = require("../../domai-primitives/ComponentName");
const ExtensionFactory_1 = require("../../domai-primitives/ExtensionFactory");
const FileChangeDetector_1 = require("../../file-change-detectors/FileChangeDetector");
const StorybookWriter_1 = require("./StorybookWriter");
const PathParser_1 = require("../../path-parsers/PathParser");
const ASBJson_1 = require("./ASBJson");
const FileDomain_1 = require("../../domai-primitives/FileDomain");
class AutoCreateStorybook {
    constructor() {
        this.asbJson = new ASBJson_1.ASBJson();
        this.run = () => {
            console.log('run auto create story book!!');
            this.watcher.watch();
        };
        this.fileChangeCallback = (changeFilePath) => {
            try {
                const changeFile = new FileDomain_1.FileDomain(changeFilePath);
                if (this.isTSX(changeFile) && this.isUnderSrc(changeFilePath)) {
                    const componentName = new ComponentName_1.ComponentName(changeFile.filenameExcludeExtension);
                    const replacedPath = new ComponentFilePath_1.ComponentFilePath(this.replaceSrcToStorybook(changeFile.directoryPath));
                    new DirectoryCreater_1.DirectoryCreater(replacedPath).create();
                    new StorybookWriter_1.StorybookWriter(componentName, changeFile, this.pathParser).write();
                    return;
                }
            }
            catch (e) {
                console.log(e);
                return;
            }
            return;
        };
        this.isTSX = (changeFile) => {
            const tsxExtension = new ExtensionFactory_1.ExtensionFactory().createExtension('tsx');
            const changeFileExtension = changeFile.extension;
            return changeFileExtension.extension === tsxExtension.extension;
        };
        this.isUnderSrc = (changeFilePath) => {
            const { srcTop } = this.asbJson.value;
            const beginIndex = changeFilePath.search(srcTop + '/');
            return beginIndex === 0;
        };
        this.replaceSrcToStorybook = (changeFilePath) => {
            const { srcTop, storybookTop } = this.asbJson.value;
            const replacedPath = changeFilePath.replace(srcTop, storybookTop);
            return replacedPath;
        };
        this.watcher = new FileChangeDetector_1.FileChangeDetector({ change: this.fileChangeCallback });
        this.pathParser = new PathParser_1.PathParser();
    }
}
exports.AutoCreateStorybook = AutoCreateStorybook;
