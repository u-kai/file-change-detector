import { FileChangeDetector } from './classes/file-change-detectors/FileChangeDetector'
import { EventToCallback } from './types/file-change-detects/EventToCallback'
import * as path from 'path'
const c2 = (addFilePath: string) => {
    fileDetectorForStorybook(addFilePath)
}

const data: EventToCallback = {
    change: c2,
}
const fcd = new FileChangeDetector(data)
fcd.watch()
import { PathParser } from './classes/path-parsers/PathParser'
import { fileDetectorForStorybook } from './functions/fileDetectorForStorybook'

const pp = new PathParser('./src/classes/file-change-detectors/AddComponentDetector.ts')
pp.relative('./src/classes/path-parsers/PathParser.ts')
