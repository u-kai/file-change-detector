import { IExtension } from '../../interfaces/domain-privitives/IExtension'

export class AnyExtension implements IExtension {
    readonly extension: string
    private extensionMaxLength = 10
    private extensionMinLength = 3
    constructor(extension: string) {
        if (this.isNotExtension(extension)) {
            throw new Error(`${extension} is not extension `)
        }
        if (this.hasPreviousDot(extension) === false) {
            this.extension = this.addPreviousDot(extension)
            return this
        }
        this.extension = extension
    }
    private isNotExtension = (value: string): boolean => {
        if (this.isRange(value) === false) {
            return true
        }
        if (this.isExtensionWithSomething(value)) {
            return true
        }
        return false
    }
    private hasPreviousDot = (value: string): boolean => {
        return /^\.[a-z]+$/.test(value)
    }
    private isExtensionWithSomething = (value: string): boolean => {
        return /.\..+$/.test(value)
    }
    private isRange = (value: string): boolean => {
        return value.length >= this.extensionMinLength && value.length <= this.extensionMaxLength
    }
    private addPreviousDot = (value: string): string => '.' + value
}
