import { ICommand } from './ICommand'

export interface ICommandFactory {
    createCommand: (source: string) => ICommand
}
