import { IFileChangeDetector } from '../../../interfaces/file-chnage-detectors/IFileChangeDetector'
import { FileChangeCallback } from '../../../types/file-change-detects/FileChangeCallback'
import { AnyExtension } from '../../domai-primitives/AnyExtension'
import { FileChangeDetector } from '../../file-change-detectors/FileChangeDetector'
import { ExtensinoToCommand } from './ExtensionToCommand'

export class AutoExecuter {
    private wathcer: IFileChangeDetector
    private extensionToCommand: ExtensinoToCommand
    constructor() {
        this.wathcer = new FileChangeDetector({ change: this.fileChangeCallback })
        this.extensionToCommand = new ExtensinoToCommand()
    }
    run = (): void => {
        console.log('run auto executer')
        this.wathcer.watch()
    }
    private fileChangeCallback: FileChangeCallback = (changeFilePath: string) => {
        const py = new AnyExtension('py')
        console.log(this.extensionToCommand.getCommand(py))
    }
}
