import { IExtension } from '../../interfaces/domain-privitives/IExtension'
import { AnyExtension } from './AnyExtension'

export class ExtensionFactory {
    createExtension = (extension: string): IExtension => {
        return new AnyExtension(extension)
    }
}
