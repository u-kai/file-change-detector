import { ICommand } from '../../interfaces/domain-privitives/ICommand'
import { ICommandFactory } from '../../interfaces/domain-privitives/ICommandFactory'
import { AnyCommand } from './AnyCommand'

export class CommandFactory implements ICommandFactory {
    createCommand = (source: string): ICommand => {
        return new AnyCommand(source)
    }
}
