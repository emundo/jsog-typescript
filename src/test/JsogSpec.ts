import { JsogObject } from './../main/model/JsogObject';
import { ListItem } from './support/ListItem';
import { List } from './support/List';
import { SpecReporter } from 'jasmine-spec-reporter';
// Module
import { JsogService } from './../main/module/Jsog';
import { Logger } from './../main/log/Logger';

// Model
import { Reference } from './support/Reference';
import { BackReference } from './support/BackReference';

// Moment
import * as moment from 'moment';

// Setup...
const log = Logger.getInstance();
jasmine.getEnv().addReporter(new SpecReporter());
const jsog = new JsogService();

describe('Serializing', () => {
    const foo: any = {};
    jsog.serialize(foo);
    it('should not modify the original obje', () => {
        expect(foo).toEqual({});
    });
});

describe('Deserializing object with two references to the same object', () => {
    const serialized: any = {
        '@id': '1',
        inside1: {
            '@id': '2',
            name: 'thing',
        },
        inside2: {
            '@ref': '2',
        },
    };
    const deserialized: any = jsog.deserialize(serialized);

    it('should not instantiate the inner object twice', () => {
        expect(deserialized.inside1).toEqual(deserialized.inside2);
    });
    it('should deserialize the reference right', () => {
        expect(deserialized.inside1).toEqual({ name: 'thing' });
    });
    it('should not have an @id', () => {
        expect(deserialized['@id']).toBeUndefined();
    });
});

describe('Objects with cyclic references', () => {
    const circular: any = {};
    circular.me = circular;
    const serialized: any = jsog.serialize(circular);
    const decoded: any = jsog.deserialize(serialized);

    it('should get an id', () => {
        expect(serialized['@id']).toEqual('1');
    });
    it('should have resolved references', () => {
        expect(serialized.me['@ref'] === serialized['@id']);
    });
    it('sould not serialize id in references', () => {
        expect(circular['@id']).toBeUndefined();
    });
    it('should not instantiate any object twice', () => {
        expect(decoded.me === decoded);
    });
});

describe('Serializing undefined', () => {
    it('should work', () => {
        expect(jsog.serialize(undefined) === undefined);
    });
    it('references should work', () => {
        const foo: any = {
            foo: undefined,
        };
        const serialized = jsog.serialize(foo);
        expect(serialized['@id']).toEqual('1');
        expect(serialized.foo).toBeUndefined();
    });
});

describe('Serializing arrays', () => {
    const foo: any = {
        bar: true,
    };
    const array: any = [foo, foo];
    const serialized: any = jsog.serialize(array);

    it('should work', () => {
        expect(serialized[0]['@id']).toEqual('1');
        expect(serialized[0]['@id'] === serialized[1]['@ref']);
    });
});

describe('Serializing objects with toJSON methods', () => {
    return it('should not change them', () => {
        const foo: any = {
            foo: moment(),
        };
        const serialized: any = jsog.serialize(foo);
        expect(serialized.foo === foo.foo);
    });
});

describe('Using custom identifier and reference strings', () => {
    const duplicate: any = {
        lorem: 'ipsum',
    };
    const outside: any = {
        one: duplicate,
        two: duplicate,
    };

    // Set custom references
    jsog.idKey = '@MyId';
    jsog.refKey = '@MyRef';

    const encoded: any = jsog.serialize(outside);
    const decoded: any = jsog.deserialize(encoded);

    it('should should serialize properly', () => {
        expect(encoded['@MyId']).toBeDefined();
        expect(encoded['@Id']).toBeUndefined();
    });
    it('should deserialize properly', () => {
        expect(decoded['@MyId']).toBeUndefined();
        expect(decoded['@Id']).toBeUndefined();
    });

    // Reset custom references
    jsog.idKey = '@id';
    jsog.refKey = '@ref';
});

describe('Deserialize null values', () => {
    const serialized: any = {
        '@id': '1',
        // tslint:disable-next-line:no-null-keyword
        lorem: null,
    };
    const deserialized: any = jsog.deserialize(serialized);

    it('should work', () => {
        expect(deserialized.lorem).toBeNull();
    });
});

describe('Annotated cyclic references', () => {
    it('should serialize right', () => {
        const referenceObj = new Reference();
        const backReferenceObj = new BackReference();

        referenceObj.reference = backReferenceObj;
        backReferenceObj.backReference = referenceObj;

        const result: any = jsog.serialize(referenceObj);

        expect(result).toEqual({
            '@id': '1',
            'reference': {
                '@id': '2',
                'backReference': {
                    '@ref': '1',
                },
            },
        });
    });

    it('should instantiate classes during deserialization', () => {
        const input = {
            '@id': '1',
            'reference': {
                '@id': '2',
                'backReference': {
                    '@ref': '1',
                },
            },
        };

        const result = jsog.deserialize(input, Reference);

        const referenceObj = new Reference();
        const backReferenceObj = new BackReference();

        referenceObj.reference = backReferenceObj;
        backReferenceObj.backReference = referenceObj;

        expect(result).toEqual(referenceObj);
    });

    it('should deserialize lists', () => {

        const jsogObj = {
            '@id': '1',
            'allItem': [
                {
                    '@id': '2',
                    'property': 1,
                }, {
                    '@id': '3',
                    'property': 2,
                },
            ],
        };

        const result: any = jsog.deserialize(jsogObj, List);

        const list = new List();
        const item1 = new ListItem();
        item1.property = 1;
        const item2 = new ListItem();
        item2.property = 2;
        list.allItem.push(item1, item2);

        expect(result).toEqual(list);
    });
});
