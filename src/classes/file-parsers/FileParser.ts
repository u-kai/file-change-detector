import { IExtension } from '../../interfaces/domain-privitives/IExtension'
import { IFile } from '../../interfaces/domain-privitives/IFile'
import { ExtensionFactory } from '../domai-primitives/ExtensionFactory'

export class FileParser {
    private file: IFile
    private beginExtensionIndex: number
    constructor(file: IFile) {
        this.file = file
        this.beginExtensionIndex = this.file.filename.search(/\.[a-z0-9]*$/)
    }
    isMatchExtension = (extension: IExtension): boolean => {
        const wantExtension = extension.extension
        const thisExtension = this.getExtension().extension
        return wantExtension === thisExtension
    }
    getFileNameExcludeExtension = (): string => {
        const filename = this.file.filename
        const removeExtensionFileName = filename.substr(0, this.beginExtensionIndex)
        return removeExtensionFileName
    }
    private getExtension = (): IExtension => {
        const extension: string = this.file.filename.substr(this.beginExtensionIndex)
        return new ExtensionFactory().createExtension(extension)
    }
}
