import { describe, it, beforeEach } from 'https://deno.land/std@0.208.0/testing/bdd.ts';

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/assert_equals.ts';

import { Game       } from '../lib/game.js';
import { extensions } from '../lib/extensions.js';

describe('extensions', () => {

    class GameSubClassA extends Game { }
    class GameSubClassB extends Game { }
    class GameSubClassC extends GameSubClassB { }

    /** @type {GameSubClassA} */
    let gameA;
    /** @type {GameSubClassB} */
    let gameB;
    /** @type {GameSubClassC} */
    let gameC;

    beforeEach(() => {
        gameA = new GameSubClassA();
        gameB = new GameSubClassB();
        gameC = new GameSubClassC();
    });

    it('should have the same instance of extensions across the import and all instances of Game', () => {
        assertEquals(gameA.extensions, extensions);
        assertEquals(gameB.extensions, extensions);
        assertEquals(gameC.extensions, extensions);
    });
});
