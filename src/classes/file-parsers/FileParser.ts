import { IExtension } from '../../interfaces/file-parsers/IExtension'
import { ExtensionFactory } from './ExtensionFactory'
import { File } from './File'

export class FileParser {
    private file: File
    private beginExtensionIndex: number
    constructor(file: File) {
        this.file = file
        this.beginExtensionIndex = this.file.value.search(/\.[a-z0-9]*$/)
    }
    isMatchExtension = (extension: IExtension): boolean => {
        const wantExtension = extension.value
        const thisExtension = this.getExtension().value
        console.log(wantExtension, thisExtension)
        return wantExtension === thisExtension
    }
    getExtension = (): IExtension => {
        const extension: string = this.file.value.substr(this.beginExtensionIndex)
        return new ExtensionFactory().createExtension(extension)
    }
    getFileNameExcludeExtension = (): string => {
        const filename = this.file.value
        const removeExtensionFileName = filename.substr(0, this.beginExtensionIndex)
        return removeExtensionFileName
    }
}
