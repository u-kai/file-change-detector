import * as path from 'path'
import { IFile } from '../../interfaces/domain-privitives/IFile'
export class FileExcludePath implements IFile {
    readonly filename: string
    constructor(filePath: string) {
        if (this.hasExtension(filePath) === false) {
            throw new Error('this file is not extension')
        }
        if (this.isWithPath(filePath)) {
            const filename = path.basename(filePath)
            this.filename = filename
            return this
        }
        this.filename = filePath
    }
    private hasExtension = (filePath: string): boolean => {
        return /^.*\./.test(filePath)
    }
    private isWithPath = (filePath: string): boolean => {
        return /[\/]/.test(filePath)
    }
}
