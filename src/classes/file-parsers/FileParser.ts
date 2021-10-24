import { IExtension } from '../../interfaces/domain-privitives/IExtension'
import { IFile } from '../../interfaces/domain-privitives/IFile'
import { ExtensionFactory } from '../domai-primitives/ExtensionFactory'

export class FileParser {
    private file: IFile
    constructor(file: IFile) {
        this.file = file
    }
    isMatchExtension = (extension: IExtension): boolean => {
        const wantExtension = extension.extension
        const thisExtension = this.file.extension.extension
        return wantExtension === thisExtension
    }
}
