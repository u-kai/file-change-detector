import { IExtension } from './IExtension'

export interface IFile {
    readonly filename: string
    readonly filenameExcludeExtension: string
    readonly directoryPath: string
    readonly extension: IExtension
}
