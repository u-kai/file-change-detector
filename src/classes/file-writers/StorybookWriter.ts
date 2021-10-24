import { IComponentName } from '../../interfaces/domain-privitives/IComponentName'
import { IPath } from '../../interfaces/domain-privitives/IPath'
import { IFileWriter } from '../../interfaces/witers/IFileWriter'
import { readFileSync } from 'fs'
import { getIntrospectionQuery } from 'graphql'

type AutoStorybookJson = {
    srcTop: string
    storybooksTop: string
}
class ASBJson {
    readonly value: AutoStorybookJson
    private filename = './auto-sb.json'
    constructor() {
        const content: string = readFileSync(this.filename, 'utf-8')
        const parseContent = JSON.parse(content)
        if (this.isAutoStorybookJson(parseContent)) {
            this.value = parseContent
            return this
        }
        throw new Error('auto-sb.json filed is must implements srcTop and storybooksTop')
    }
    private isAutoStorybookJson = (value: any): value is AutoStorybookJson => {
        return value.srcTop && value.storybooksTop
    }
}

export class StorybookWriter implements IFileWriter {
    private componentName: IComponentName
    private componentFilePath: IPath
    private asbJson: AutoStorybookJson
    constructor(componentName: IComponentName, componentFilePath: IPath) {
        this.componentName = componentName
        this.componentFilePath = componentFilePath
        this.asbJson = new ASBJson().value
    }
    write = (): void => {}
    private makeContents = () => {
        const content = `
import {${this.componentName.name}} from "${this.componentFilePath.relative}"
import {action} from "@storybook/addon-action"
export default {
    component: ${this.componentName.name},
    title: '${this.componentName.name}'
}
export const Storybook = () => <${this.componentName.name}>auto create</${this.componentName.name}>`
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
