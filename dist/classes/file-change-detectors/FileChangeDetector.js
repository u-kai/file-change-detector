"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileChangeDetector = void 0;
const chokidar = require("chokidar");
class FileChangeDetector {
    constructor(eventToCallback, watchTopDirectory = '.') {
        this.watch = () => {
            this.getEventTypes().map((eventType) => {
                const callback = this.eventToCallback[eventType];
                if (callback === undefined) {
                    throw new Error('callback is not undefined');
                }
                chokidar.watch(this.watchTopDirectory).on(eventType, (path) => callback(path));
            });
        };
        this.getEventTypes = () => Object.keys(this.eventToCallback).map((key) => key);
        this.isEmpty = (obj) => Object.keys(obj).length === 0;
        this.watchTopDirectory = watchTopDirectory;
        if (this.isEmpty(eventToCallback)) {
            throw new Error('eventToCallback is must not Empty Object');
        }
        this.eventToCallback = eventToCallback;
    }
}
exports.FileChangeDetector = FileChangeDetector;
