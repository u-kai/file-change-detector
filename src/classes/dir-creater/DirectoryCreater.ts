import { mkdirSync } from 'fs'
import { IPath } from '../../interfaces/domain-privitives/IPath'
export class DirectoryCreater {
    private directoryPath: IPath
    constructor(directoryPath: IPath) {
        this.directoryPath = directoryPath
    }
    create = () => {
        mkdirSync(this.directoryPath.relative, { recursive: true })
    }
}
