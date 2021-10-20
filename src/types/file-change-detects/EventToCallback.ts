import { EventType } from './EventType'
import { FileChangeCallback } from './FileChangeCallback'

export type EventToCallback = {
    [key in EventType]?: FileChangeCallback
}
