import { FileChangeDetector } from './classes/file-change-detectors/FileChangeDetector'
import { EventToCallback } from './types/file-change-detects/EventToCallback'
import { fileDetectorForStorybook } from './functions/fileDetectorForStorybook'
import { PathParser } from './classes/path-parsers/PathParser'
import { StorybookWriter } from './classes/file-writers/StorybookWriter'
import { ComponentName } from './classes/domai-primitives/ComponentName'
import { ComponentFilePath } from './classes/domai-primitives/ComponentFilePath'
export const testData = 'test'
const c2 = (addFilePath: string) => {
    fileDetectorForStorybook(addFilePath)
}

const data: EventToCallback = {
    change: c2,
}
const pathParser = new PathParser()
console.log(pathParser.getImportStatementPath('./src/co/src/storybooks', './src/co/index.ts'))
console.log(pathParser.getImportStatementPath('./storybooks', './src/component/index.ts'))
console.log(pathParser.getDirectories('./src/component/index.ts'))
const componentName = new ComponentName('Button')
const componentFilePath = new ComponentFilePath('./src/component/Index.ts')
const sbw = new StorybookWriter(componentName, componentFilePath)
console.log('sbw', sbw.getFileDirPath())

const fcd = new FileChangeDetector(data)
fcd.watch()
