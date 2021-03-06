import { describe, it, beforeEach                        } from 'https://deno.land/std@0.143.0/testing/bdd.ts';
import { assert, assertExists, assertEquals, assertFalse } from 'https://deno.land/std@0.143.0/testing/asserts.ts';


import { ObjectPath } from '../../../lib/utils/object-path.js';

describe('ObjectPath', () => {
    let path, target;
    beforeEach(() => {
        target = { foo: { bar: [1, 2, 3], baz: 123 } };
    });

    describe('assign', () => {
        it('should assign a nested value to an object', () => {
            path = new ObjectPath('foo', 'bar', 0);
            path.assign(target, 'test');
            assertEquals(target.foo.bar[0], 'test');
        });

        it('should create nested properties if they do not exist', () => {
            path = new ObjectPath('foo', 'baz');
            path.assign(target, 'test');
            assertEquals(target.foo.baz, 'test');
        });

        it('should create deeply nested properties if they do not exist', () => {
            path = new ObjectPath('foo', 'bat', 'boo');
            path.assign(target, 'test');
            assertExists(target.foo.bat);
            assertEquals(target.foo.bat.boo, 'test');
        });

        it('should create nested properties as array if path key is a positive integer', () => {
            path = new ObjectPath('foo', 'bat', 0);
            path.assign(target, 'test');
            assertFalse(Array.isArray(target.foo));
            assert(Array.isArray(target.foo.bat));
            assertEquals(target.foo.bat[0], 'test');
        });
    });

    describe('read', () => {
        it('should read a nested value from an object', () => {
            path = new ObjectPath('foo', 'bar', 0);
            assertEquals(path.read(target), 1);
        });

        it('should return undefined if the nested property does not exist', () => {
            path = new ObjectPath('foo', 'bat');
            assertEquals(path.read(target), undefined);
        });

        it('should return undefined if any level of the nested property does not exist', () => {
            path = new ObjectPath('foo', 'bat', 'boo');
            assertEquals(path.read(target), undefined);
        });
    });
});
