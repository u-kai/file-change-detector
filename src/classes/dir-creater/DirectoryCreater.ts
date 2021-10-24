import { mkdir, existsSync } from 'fs'
import { IPath } from '../../interfaces/domain-privitives/IPath'
export class DirectoryCreater {
    private directoryPath: IPath
    constructor(directoryPath: IPath) {
        this.directoryPath = directoryPath
    }
    create = (): void => {
        mkdir(this.directoryPath.relative, { recursive: true }, (err) => console.log(err))
    }
    isExist = (): boolean => {
        return existsSync(this.directoryPath.relative)
    }
}
