"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandFactory = void 0;
const AnyCommand_1 = require("./AnyCommand");
class CommandFactory {
    constructor() {
        this.createCommand = (source) => {
            return new AnyCommand_1.AnyCommand(source);
        };
    }
}
exports.CommandFactory = CommandFactory;
