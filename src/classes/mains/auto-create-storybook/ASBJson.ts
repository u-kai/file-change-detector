import { readFileSync } from 'fs'

export type AutoStorybookJson = {
    srcTop: string
    storybookTop: string
}

export class ASBJson {
    readonly value: AutoStorybookJson
    private filename = './auto-sb.json'
    constructor() {
        const content: string = readFileSync(this.filename, 'utf-8')
        const parseContent = JSON.parse(content)
        if (this.isAutoStorybookJson(parseContent) === false) {
            throw new Error('auto-sb.json filed is must implements srcTop and storybookTop')
        }
        if (this.isAutoStorybookJson(parseContent)) {
            const { srcTop, storybookTop } = parseContent
            if (this.isInvalidTail(srcTop) === true) {
                throw new Error(`invalid srcTop path. ${srcTop} tail is not * / . `)
            }
            if (this.isInvalidTail(storybookTop) === true) {
                throw new Error(`invalid storybookTop path. ${storybookTop} tail is not * / . `)
            }
            if (this.hasRelativeHead(srcTop)) {
                parseContent.srcTop = this.removeRelativeHead(parseContent.srcTop)
            }
            if (this.hasRelativeHead(storybookTop)) {
                parseContent.storybookTop = this.removeRelativeHead(parseContent.storybookTop)
            }
            this.value = parseContent
            return this
        }
        throw new Error(`unexpect error from ASBJSON, file content = ${Object.keys(parseContent)}`)
    }
    private isAutoStorybookJson = (value: any): value is AutoStorybookJson => {
        return value.srcTop && value.storybookTop
    }
    private removeRelativeHead = (path: string) => {
        return path.substr('./'.length)
    }
    private hasRelativeHead = (path: string) => {
        return /^\.\/[a-z][a-z0-9A-Z]+/.test(path)
    }
    private isInvalidTail = (path: string): boolean => {
        return /[\*\.\/]$/.test(path)
    }
}
