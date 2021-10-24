import * as path from 'path'
import { IExtension } from '../../interfaces/domain-privitives/IExtension'
import { IFile } from '../../interfaces/domain-privitives/IFile'
import { ExtensionFactory } from './ExtensionFactory'
export class FileDomain implements IFile {
    readonly filename: string
    readonly filenameExcludeExtension: string
    readonly directoryPath: string
    readonly extension: IExtension
    constructor(filePath: string) {
        if (this.hasExtension(filePath) === false) {
            throw new Error('this file is not extension')
        }
        this.extension = this.createExtension(filePath)
        if (this.isWithPath(filePath)) {
            const filename = path.basename(filePath)
            this.filename = filename
            this.directoryPath = this.createDirectoryPath(filePath, this.filename)
            this.filenameExcludeExtension = this.createFileNameExcludeExtension(this.filename)
            return this
        }
        this.filename = filePath
        this.directoryPath = this.createDirectoryPath(filePath, this.filename)
        this.filenameExcludeExtension = this.createFileNameExcludeExtension(this.filename)
    }
    private hasExtension = (filePath: string): boolean => {
        return /^.*\./.test(filePath)
    }
    private isWithPath = (filePath: string): boolean => {
        return /[\/]/.test(filePath)
    }
    private createExtension = (filePath: string): IExtension => {
        const extensionString: string = filePath.substr(this.getBeginExtensionIndex(filePath))
        const extension: IExtension = new ExtensionFactory().createExtension(extensionString)
        return extension
    }
    private createDirectoryPath = (filePath: string, filename: string): string => {
        const beginFileNameIndex = filePath.search(filename)
        if (beginFileNameIndex === 0) {
            return ''
        }
        const directoryPath = filePath.substr(0, beginFileNameIndex)
        return directoryPath
    }
    private createFileNameExcludeExtension = (filename: string): string =>
        filename.substr(0, this.getBeginExtensionIndex(filename))
    private getBeginExtensionIndex = (filePath: string): number => filePath.search(/\.[a-z0-9]*$/)
}
