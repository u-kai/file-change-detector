import { EventType } from './EventType'

export type EventToCallback = {
    [key in EventType]?: (path: string) => void
}
