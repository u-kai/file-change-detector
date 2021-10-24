import { IPath } from '../../interfaces/domain-privitives/IPath'

export class ComponentFilePath implements IPath {
    readonly relative
    readonly abs
    constructor(path: string) {
        this.relative = path
        this.abs = 'not implements'
    }
}
