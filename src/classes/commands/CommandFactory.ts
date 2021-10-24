import { ICommand } from '../../interfaces/commands/ICommand'
import { ICommandFactory } from '../../interfaces/commands/ICommandFactory'
import { AnyCommand } from './AnyCommand'

export class CommandFactory implements ICommandFactory {
    createCommand = (source: string): ICommand => {
        return new AnyCommand(source)
    }
}
