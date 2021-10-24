import { IFileChangeDetector } from '../../interfaces/file-chnage-detectors/IFileChangeDetector'
import * as chokidar from 'chokidar'
import { EventType } from '../../types/file-change-detects/EventType'
import { EventToCallback } from '../../types/file-change-detects/EventToCallback'
export class FileChangeDetector implements IFileChangeDetector {
    private watchTopDirectory: string
    private eventToCallback: EventToCallback
    constructor(eventToCallback: EventToCallback, watchTopDirectory = '.') {
        this.watchTopDirectory = watchTopDirectory
        if (this.isEmpty(eventToCallback)) {
            throw new Error('eventToCallback is must not Empty Object')
        }
        this.eventToCallback = eventToCallback
    }

    watch = (): void => {
        this.getEventTypes().map((eventType) => {
            const callback = this.eventToCallback[eventType]
            if (callback === undefined) {
                throw new Error('callback is not undefined')
            }
            chokidar.watch(this.watchTopDirectory).on(eventType, (path) => callback(path))
        })
    }
    private getEventTypes = (): EventType[] => Object.keys(this.eventToCallback).map((key) => key as EventType)
    private isEmpty = <T>(obj: { [key: string]: T }): boolean => Object.keys(obj).length === 0
}
