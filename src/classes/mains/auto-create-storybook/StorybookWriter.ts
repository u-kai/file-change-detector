import { IComponentName } from '../../../interfaces/domain-privitives/IComponentName'
import { IFileWriter } from '../../../interfaces/witers/IFileWriter'
import { existsSync, writeFileSync } from 'fs'
import { PathParser } from '../../path-parsers/PathParser'
import { ASBJson, AutoStorybookJson } from './ASBJson'
import { IFile } from '../../../interfaces/domain-privitives/IFile'

export class StorybookWriter implements IFileWriter {
    private componentName: IComponentName
    private componentFile: IFile
    private asbJson: AutoStorybookJson
    private pathParser: PathParser
    constructor(componentName: IComponentName, componentFile: IFile, pathParser: PathParser) {
        this.componentName = componentName
        this.componentFile = componentFile
        this.asbJson = new ASBJson().value
        this.pathParser = pathParser
    }
    write = (): void => {
        if (this.isExistStorybooks()) {
            return
        }
        writeFileSync(this.srcFilePathToStorybooksFilePath(), this.makeContents())
        console.log(`Create ${this.srcFilePathToStorybooksFilePath()} is Success!!`)
    }
    private makeContents = (): string => {
        const importStatement = `import {${this.componentName.name}} from "${this.getImportStatementPath()}"`
        const content = `${importStatement}
import {action} from "@storybook/addon-action"
export default {
    component: ${this.componentName.name},
    title: '${this.componentName.name}'
}
export const Storybook = () => <${this.componentName.name}>auto create</${this.componentName.name}>`
        return content
    }
    private getImportStatementPath = (): string => {
        const importStatementPath = this.pathParser.getImportStatementPath(
            this.srcFilePathToStorybooksFilePath(),
            this.componentFile.directoryPath + this.componentFile.filename
        )
        return importStatementPath
    }
    private srcFilePathToStorybooksFilePath = (): string => {
        const src = this.asbJson.srcTop
        const story = this.asbJson.storybookTop
        const replaceToStorybooksDir = this.componentFile.directoryPath.replace(src, story)
        return replaceToStorybooksDir + this.componentFile.filenameExcludeExtension + '.stories.tsx'
    }
    private isExistStorybooks = (): boolean => {
        return existsSync(this.srcFilePathToStorybooksFilePath())
    }
}
