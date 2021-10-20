import * as chokidar from 'chokidar'
import { FileChangeDetector } from './classes/FileChangeDetector'
import { EventToCallback } from './types/EventToCallback'
const c1 = (path: string) => console.log(path)
const c2 = (path: string) => console.log('dir', path)

const data: EventToCallback = {
    change: c1,
    addDir: c2,
}
const fcd = new FileChangeDetector(data)
fcd.watch()
