import { readFileSync } from 'fs'
import { resolve } from 'path'
import { IExtension } from '../../../interfaces/domain-privitives/IExtension'
import { AnyExtension } from '../../domai-primitives/AnyExtension'

export class ExtensionToCommand {
    private extensionToCommand: { [key: string]: string }
    constructor() {
        const jsonContent: string = readFileSync(resolve(__dirname, 'ExtensionToCommands.json'), 'utf-8')
        const jsonData: { [key: string]: string } = JSON.parse(jsonContent)
        const extensionToCommand: { [key: string]: string } = {}
        Object.keys(jsonData).map((key) => {
            const command = jsonData[key]
            const extension = new AnyExtension(key).extension
            extensionToCommand[extension] = command
        })
        this.extensionToCommand = extensionToCommand
    }
    getCommand = (extension: IExtension): string => {
        return this.extensionToCommand[extension.extension]
    }
}
