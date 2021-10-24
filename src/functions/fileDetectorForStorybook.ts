import { ExtensionFactory } from '../classes/file-parsers/ExtensionFactory'
import { File } from '../classes/file-parsers/File'
import { FileParser } from '../classes/file-parsers/FileParser'
import { IExtension } from '../interfaces/file-parsers/IExtension'
import { FileChangeCallback } from '../types/file-change-detects/FileChangeCallback'

export const fileDetectorForStorybook: FileChangeCallback = (changeFilePath: string): void => {
    const tsxExtension: IExtension = new ExtensionFactory().createExtension('tsx')
    const changeFile: File = new File(changeFilePath)
    const parser = new FileParser(changeFile)

    console.log(parser.isMatchExtension(tsxExtension))
    if (parser.isMatchExtension(tsxExtension)) {
        console.log(changeFile.value)
    }
}
