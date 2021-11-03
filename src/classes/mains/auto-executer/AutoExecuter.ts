import { IFile } from '../../../interfaces/domain-privitives/IFile'
import { FileDomain } from '../../domai-primitives/FileDomain'
import { IFileChangeDetector } from '../../../interfaces/file-chnage-detectors/IFileChangeDetector'
import { FileChangeCallback } from '../../../types/file-change-detects/FileChangeCallback'
import { FileChangeDetector } from '../../file-change-detectors/FileChangeDetector'
import { ExtensionToCommand } from './ExtensionToCommand'
import { execSync } from 'child_process'

export class AutoExecuter {
    private wathcer: IFileChangeDetector
    private extensionToCommand: ExtensionToCommand
    constructor() {
        this.wathcer = new FileChangeDetector({ change: this.fileChangeCallback })
        this.extensionToCommand = new ExtensionToCommand()
    }
    run = (): void => {
        console.log('run auto executer')
        this.wathcer.watch()
    }
    private fileChangeCallback: FileChangeCallback = (changeFilePath: string) => {
        const file: IFile = new FileDomain(changeFilePath)
        const { extension } = file
        const command: string | undefined = this.extensionToCommand.getCommand(extension)
        if (command === undefined) {
            return
        }
        const executeCommand = command + ' ' + changeFilePath
        execSync(executeCommand)
    }
}
