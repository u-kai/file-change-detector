import * as path from 'path'
export class PathParser {
    private topPath: string
    constructor(topPath = '.') {
        this.topPath = topPath
    }
    relative = (distPath: string): string => {
        const relative = path.relative(this.topPath, distPath)
        return relative
    }
}
