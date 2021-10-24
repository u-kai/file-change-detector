"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyCommand = void 0;
class AnyCommand {
    constructor(command) {
        if (!command) {
            throw new Error('value is not Empty');
        }
        this.command = command;
    }
}
exports.AnyCommand = AnyCommand;
