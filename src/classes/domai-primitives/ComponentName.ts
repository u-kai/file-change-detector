import { IComponentName } from '../../interfaces/domain-privitives/IComponentName'

export class ComponentName implements IComponentName {
    readonly name: string
    constructor(componentName: string) {
        if (this.isBeginUppercase(componentName) === false) {
            throw new Error("Component name's first charactor is must uppercase letter")
        }
        this.name = componentName
    }
    private isBeginUppercase = (value: string): boolean => {
        return /^[A-Z]*[a-z0-9]*$/.test(value)
    }
}
