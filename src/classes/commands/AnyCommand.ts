import { ICommand } from '../../interfaces/commands/ICommand'

export class AnyCommand implements ICommand {
    readonly value: string
    constructor(command: string) {
        if (!command) {
            throw new Error('value is not Empty')
        }
        this.value = command
    }
}
