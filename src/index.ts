import { FileChangeDetector } from './classes/file-change-detectors/FileChangeDetector'
import { EventToCallback } from './types/file-change-detects/EventToCallback'
import { PathParser } from './classes/path-parsers/PathParser'
import { StorybookWriter } from './classes/mains/auto-create-storybook/StorybookWriter'
import { ComponentName } from './classes/domai-primitives/ComponentName'
import { ComponentFilePath } from './classes/domai-primitives/ComponentFilePath'
import { DirectoryCreater } from './classes/dir-creater/DirectoryCreater'
import { AutoCreateStorybook } from './classes/mains/auto-create-storybook/AutoCreateStorybook'
export const testData = 'test'

const pathParser = new PathParser()
//console.log(pathParser.getImportStatementPath('./src/co/src/storybooks', './src/co/index.ts'))
//console.log(pathParser.getImportStatementPath('./storybooks', './src/component/index.ts'))
//console.log(pathParser.getDirectories('./src/component/index.ts'))
//const componentName = new ComponentName('Button')
//const componentFilePath = new ComponentFilePath('./src/component/Index.ts')
//const sbw = new StorybookWriter(componentName, componentFilePath, pathParser)
//console.log('sbw', sbw.getFileDirPath())
//console.log(sbw.srcDirToStorybooksDir())
//console.log('pathparse', sbw.getImportStatementPath())
//const dc = new DirectoryCreater(new ComponentFilePath('./src/functions/'))
//console.log(dc.isExist())
//dc.create()
//const fcd = new FileChangeDetector(data)
//fcd.watch()

const acs = new AutoCreateStorybook()
acs.run()
