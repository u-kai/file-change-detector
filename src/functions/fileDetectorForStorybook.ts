import { ComponentName } from '../classes/domai-primitives/ComponentName'
import { ExtensionFactory } from '../classes/domai-primitives/ExtensionFactory'
import { FileExcludePath } from '../classes/domai-primitives/FileExcludePath'
import { FileParser } from '../classes/file-parsers/FileParser'
import { IComponentName } from '../interfaces/domain-privitives/IComponentName'
import { IExtension } from '../interfaces/domain-privitives/IExtension'
import { IFile } from '../interfaces/domain-privitives/IFile'
import { FileChangeCallback } from '../types/file-change-detects/FileChangeCallback'

export const fileDetectorForStorybook: FileChangeCallback = (changeFilePath: string): void => {
    const tsxExtension: IExtension = new ExtensionFactory().createExtension('.tsx')
    const changeFile: IFile = new FileExcludePath(changeFilePath)
    const parser: FileParser = new FileParser(changeFile)
    if (parser.isMatchExtension(tsxExtension)) {
        const changeFileNameExcludeExtension: string = parser.getFileNameExcludeExtension()
        const componentName: IComponentName = new ComponentName(changeFileNameExcludeExtension)
        console.log(changeFileNameExcludeExtension)
    }
}
