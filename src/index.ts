import { FileChangeDetector } from './classes/file-change-detectors/FileChangeDetector'
import { EventToCallback } from './types/file-change-detects/EventToCallback'
const c1 = (path: string) => console.log(path)
const c2 = (path: string) => console.log('dir', path)

const data: EventToCallback = {
    change: c1,
    addDir: c2,
}
const fcd = new FileChangeDetector(data)
fcd.watch()
