import { Class } from '../support/Class';
import 'reflect-metadata';

/**
 * Marks an property for Class instantiation.
 *
 * If the property is an Array clazz must be supplied with the clazz of the Array elements.
 *
 * @param clazz Class to instantiate elements.
 */
export function JsonProperty<T extends object>(clazz?: Class<T>): PropertyDecorator {
    return Reflect.metadata('JsonProperty', clazz);
}
