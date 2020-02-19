import { GameNode } from './gom/game-node.js';

export class System extends GameNode {
    /**
     * Creates an instance of System.
     * @param {String} id
     */
    constructor(id) {
        super(id);
        this.enabled = true;

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
        return this.parent ? this.parent.parent : undefined;
    }

    /**
     * A reference to the children of a System which is a {@link GameNodeChildSet<EntityModel>}.
     *
     * @type {GameNodeChildSet<EntityModel>}
     * @readonly
     */
    get models() {
        return this.children;
    }

    /**
     * Calls super.init and adds System to {@link Stage.entityRegistry}.
     *
     * @memberof System
     */
    async init() {
        await super.init();
        this.stage.entityRegistry.registerSystem(this);
    }

    /**
     * Calls super.dispose and removes System from {@link Stage.entityRegistry}
     *
     * @memberof System
     */
    async dispose() {
        this.stage.entityRegistry.unregisterSystem(this);
        await super.dispose();
    }

    /* c8 ignore next 3 */
    static get models() {
        return {};
    }
}

export default System;