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
    relativeTwo = (fromPath: string, toPath: string): string => {
        const relative = path.relative(fromPath, toPath)
        return relative
    }
    getImportStatementPath = (importFilePath: string, exportFilePath: string): string => {
        const relative = this.relativeTwo(importFilePath, exportFilePath)
        const beginExtensionIndex: number = relative.search(/\.[a-z]+$/)
        const importStatementPath = relative.substr(0, beginExtensionIndex)
        return importStatementPath
    }
    getDirectories = (filePath: string): string => {
        const beginFilePathIndex: number = filePath.search(/\/[a-zA-Z]+[a-zA-Z0-9]+\.[a-z]+$/)
        const directories: string = filePath.substr(0, beginFilePathIndex)
        return directories
    }
}
