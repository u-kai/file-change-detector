import * as path from 'path'
export class File {
    readonly value: string
    constructor(filePath: string) {
        if (this.hasExtension(filePath) === false) {
            throw new Error('this file is not extension')
        }
        if (this.isWithPath(filePath)) {
            //const beginFileNameIndex = filePath.search(/\/[a-z0-9]+\.[a-z]$/)

            //const filename = filePath.substr(beginFileNameIndex)
            const filename = path.basename(filePath)
            this.value = filename
            return this
        }
        this.value = filePath
    }
    private hasExtension = (filePath: string): boolean => {
        return /^.*\./.test(filePath)
    }
    private isWithPath = (filePath: string): boolean => {
        return /[\/]/.test(filePath)
    }
}
