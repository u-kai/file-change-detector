import { IComponentName } from '../../../interfaces/domain-privitives/IComponentName'
import { IExtension } from '../../../interfaces/domain-privitives/IExtension'
import { IFile } from '../../../interfaces/domain-privitives/IFile'
import { IPath } from '../../../interfaces/domain-privitives/IPath'
import { IFileChangeDetector } from '../../../interfaces/file-chnage-detectors/IFileChangeDetector'
import { MainInterface } from '../../../interfaces/MainInterface'
import { FileChangeCallback } from '../../../types/file-change-detects/FileChangeCallback'
import { DirectoryCreater } from '../../dir-creater/DirectoryCreater'
import { ComponentFilePath } from '../../domai-primitives/ComponentFilePath'
import { ComponentName } from '../../domai-primitives/ComponentName'
import { ExtensionFactory } from '../../domai-primitives/ExtensionFactory'
import { FileChangeDetector } from '../../file-change-detectors/FileChangeDetector'
import { FileParser } from '../../file-parsers/FileParser'
import { StorybookWriter } from './StorybookWriter'
import { PathParser } from '../../path-parsers/PathParser'
import { ASBJson } from './ASBJson'
import { FileDomain } from '../../domai-primitives/FileDomain'

export class AutoCreateStorybook implements MainInterface {
    private watcher: IFileChangeDetector
    private asbJson = new ASBJson()
    private pathParser: PathParser
    constructor() {
        this.watcher = new FileChangeDetector({ change: this.fileChangeCallback })
        this.pathParser = new PathParser()
    }
    run = (): void => {
        console.log('run auto create story book!!')
        this.watcher.watch()
    }
    private fileChangeCallback: FileChangeCallback = (changeFilePath: string) => {
        const changeFile: IFile = new FileDomain(changeFilePath)
        if (this.isTSX(changeFile) && this.isUnderSrc(changeFilePath)) {
            const componentName: IComponentName = new ComponentName(changeFile.filenameExcludeExtension)
            const replacedPath: IPath = new ComponentFilePath(this.replaceSrcToStorybook(changeFile.directoryPath))
            new DirectoryCreater(replacedPath).create()
            new StorybookWriter(componentName, changeFile, this.pathParser).write()
        }
        return
    }
    private isTSX = (changeFile: IFile): boolean => {
        const tsxExtension: IExtension = new ExtensionFactory().createExtension('tsx')
        const changeFileExtension = changeFile.extension
        return changeFileExtension.extension === tsxExtension.extension
    }
    private isUnderSrc = (changeFilePath: string): boolean => {
        const { srcTop } = this.asbJson.value
        const beginIndex = changeFilePath.search(srcTop + '/')
        return beginIndex === 0
    }
    private replaceSrcToStorybook = (changeFilePath: string): string => {
        const { srcTop, storybookTop } = this.asbJson.value
        const replacedPath = changeFilePath.replace(srcTop, storybookTop)
        return replacedPath
    }
}
