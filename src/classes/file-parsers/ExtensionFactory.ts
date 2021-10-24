import { IExtension } from '../../interfaces/file-parsers/IExtension'
import { AnyExtension } from './AnyExtension'

export class ExtensionFactory {
    createExtension = (extension: string): IExtension => {
        return new AnyExtension(extension)
    }
}
