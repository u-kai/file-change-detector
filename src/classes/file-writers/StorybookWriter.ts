import { IComponentName } from '../../interfaces/domain-privitives/IComponentName'
import { IPath } from '../../interfaces/domain-privitives/IPath'
import { IFileWriter } from '../../interfaces/witers/IFileWriter'
import { readFileSync } from 'fs'
import { PathParser } from '../path-parsers/PathParser'

type AutoStorybookJson = {
    srcTop: string
    storybooksTop: string
}
export class ASBJson {
    readonly value: AutoStorybookJson
    private filename = './auto-sb.json'
    constructor() {
        const content: string = readFileSync(this.filename, 'utf-8')
        const parseContent = JSON.parse(content)
        if (this.isAutoStorybookJson(parseContent) === false) {
            throw new Error('auto-sb.json filed is must implements srcTop and storybooksTop')
        }
        if (this.isAutoStorybookJson(parseContent)) {
            const { srcTop, storybooksTop } = parseContent
            if (this.hasRelativeHead(srcTop)) {
                parseContent.srcTop = this.removeRelativeHead(parseContent.srcTop)
            }
            if (this.hasRelativeHead(storybooksTop)) {
                parseContent.storybooksTop = this.removeRelativeHead(parseContent.storybooksTop)
            }
            this.value = parseContent
            return this
        }
        throw new Error('unexpect error from ASBJSON')
    }
    private isAutoStorybookJson = (value: any): value is AutoStorybookJson => {
        return value.srcTop && value.storybooksTop
    }
    private removeRelativeHead = (path: string) => {
        return path.substr('./'.length)
    }
    private hasRelativeHead = (path: string) => {
        return /^\.\/[a-z][a-z0-9A-Z]+/.test(path)
    }
}

export class StorybookWriter implements IFileWriter {
    private componentName: IComponentName
    private componentFilePath: IPath
    private asbJson: AutoStorybookJson
    private pathParser: PathParser
    constructor(componentName: IComponentName, componentFilePath: IPath, pathParser: PathParser) {
        this.componentName = componentName
        this.componentFilePath = componentFilePath
        this.asbJson = new ASBJson().value
        this.pathParser = pathParser
    }
    write = (): void => {}
    private makeContents = () => {
        const importStatement = `import {${this.componentName.name}} from "${this.getImportStatementPath()}"`
        const content = `
${importStatement}
import {action} from "@storybook/addon-action"
export default {
    component: ${this.componentName.name},
    title: '${this.componentName.name}'
}
export const Storybook = () => <${this.componentName.name}>auto create</${this.componentName.name}>`
    }
    getImportStatementPath = (): string => {
        const { storybooksTop } = this.asbJson
        const importStatementPath = this.pathParser.getImportStatementPath(
            storybooksTop,
            this.componentFilePath.relative
        )
        return importStatementPath
    }
    getFileDirPath = (): string => {
        const beginFilePathIndex = this.componentFilePath.relative.search(/\/[a-zA-Z1-9]+\.[a-z]+$/)
        const fileDirPath = this.componentFilePath.relative.substr(0, beginFilePathIndex)
        return fileDirPath
    }
    srcDirToStorybooksDir = (): string => {
        const src = this.asbJson.srcTop
        const story = this.asbJson.storybooksTop
        const replaceToStorybooksDir = this.getFileDirPath().replace(src, story)
        return replaceToStorybooksDir
    }
}
