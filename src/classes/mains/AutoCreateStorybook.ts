import { IExtension } from '../../interfaces/domain-privitives/IExtension'
import { IFile } from '../../interfaces/domain-privitives/IFile'
import { IFileChangeDetector } from '../../interfaces/file-chnage-detectors/IFileChangeDetector'
import { MainInterface } from '../../interfaces/MainInterface'
import { FileChangeCallback } from '../../types/file-change-detects/FileChangeCallback'
import { ExtensionFactory } from '../domai-primitives/ExtensionFactory'
import { FileExcludePath } from '../domai-primitives/FileExcludePath'
import { FileChangeDetector } from '../file-change-detectors/FileChangeDetector'
import { FileParser } from '../file-parsers/FileParser'
import { ASBJson } from '../file-writers/StorybookWriter'

export class AutoCreateStorybook implements MainInterface {
    private watcher: IFileChangeDetector
    constructor() {
        this.watcher = new FileChangeDetector({ change: this.fileChangeCallback })
    }
    run = (): void => {
        console.log('run auto create story book!!')
        this.watcher.watch()
    }
    private fileChangeCallback: FileChangeCallback = (changeFilePath: string) => {
        if (this.isTSX(changeFilePath) && this.isUnderSrc(changeFilePath)) {
            return
        }
    }
    private isTSX = (changeFilePath: string): boolean => {
        const tsxExtension: IExtension = new ExtensionFactory().createExtension('tsx')
        const changeFile: IFile = new FileExcludePath(changeFilePath)
        const fileParser = new FileParser(changeFile)
        console.log('isTsx', fileParser.isMatchExtension(tsxExtension))
        return fileParser.isMatchExtension(tsxExtension)
    }
    private isUnderSrc = (changeFilePath: string): boolean => {
        const asbJson = new ASBJson()
        const { srcTop } = asbJson.value
        console.log(changeFilePath)
        const beginIndex = changeFilePath.search(srcTop + '/')
        console.log('beginIndex', beginIndex === 0)
        return beginIndex === 0
    }
}
