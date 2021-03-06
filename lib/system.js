import { GameNode } from './gom/game-node.js';

export class System extends GameNode {
    /**
     * Creates an instance of System.
     * @param {String} id
     */
    constructor(id) {
        super(id);

        for (const [name, { isSet }] of Object.entries(this.constructor.models)) {
            if (isSet) this[name] = new Set();
        }
    }

    /**
     * A reference to the parent of a System which is the {@link Stage}.
     *
     * @type {Stage}
     * @readonly
     */
    get stage() {
        return this.parent;
    }

    /**
     * A reference to the parent of a System's parent which is the {@link Game}.
     *
     * @type {Game}
     * @readonly
     */
    get game() {
        return this.parent?.parent;
    }

    /**
     * A reference to the children of a System which is a {@link GameNodeChildSet<Model>}.
     *
     * @type {GameNodeChildSet<Model>}
     * @readonly
     */
    get models() {
        return this.children;
    }

    static get models() {
        return {};
    }
}

export default System;
