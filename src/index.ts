import { FileChangeDetector } from './classes/file-change-detectors/FileChangeDetector'
import { EventToCallback } from './types/file-change-detects/EventToCallback'
import { fileDetectorForStorybook } from './functions/fileDetectorForStorybook'
import { PathParser } from './classes/path-parsers/PathParser'
export const testData = 'test'
const c2 = (addFilePath: string) => {
    fileDetectorForStorybook(addFilePath)
}

const data: EventToCallback = {
    change: c2,
}
const pathParser = new PathParser()
console.log(pathParser.getImportStatementPath('./storybooks', './src/component/index.ts'))

const fcd = new FileChangeDetector(data)
fcd.watch()
