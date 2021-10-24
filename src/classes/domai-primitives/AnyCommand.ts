import { ICommand } from '../../interfaces/domain-privitives/ICommand'

export class AnyCommand implements ICommand {
    readonly command: string
    constructor(command: string) {
        if (!command) {
            throw new Error('value is not Empty')
        }
        this.command = command
    }
}
