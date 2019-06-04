import { Stage    } from '../../lib/stage.js';
import { GameNode } from '../../lib/gom/game-node.js';

/** @test {Stage} */
describe('Stage', () => {
  let stage, systemA, systemB, entityA, entityB;

  beforeEach(async () => {
    stage = new Stage();

    systemA = new GameNode('systemA');
    systemB = new GameNode('systemB');
    entityA = new GameNode('entityA');
    entityB = new GameNode('entityB');

    stage.systems.add(systemA);
    stage.systems.add(systemB);
    stage.entities.add(entityA);
    stage.entities.add(entityB);

    await new Promise(resolve => setTimeout(resolve));
  });

  /** @test {Stage#game} */
  describe('game', () => {
    it('should be a reference to the stage parent', () => {
      stage.parent = {};
      expect(stage.game).to.equal(stage.parent);
    });
  });

  /** @test {Stage#systems} */
  describe('systems', () => {
    it('should be a reference to the stage children', () => {
      expect(stage.systems).to.equal(stage.children);
    });
  });

  /** @test {Stage#components} */
  describe('components', () => {

  });

  /** @test {Stage#entities} */
  describe('entities', () => {

  });

  /** @test {Stage#update} */
  describe('update', () => {
    beforeEach(() => {
      entityA.update = sinon.spy(entityA.update.bind(entityA));
      entityB.update = sinon.spy(entityB.update.bind(entityB));
    });

    it('should call update for each entity', () => {
      stage.update();
      expect(entityA.update).to.have.been.called;
      expect(entityB.update).to.have.been.called;
    });

    it('should not call update for an inactive entity', () => {
      entityB.disabled = true;
      stage.update();
      expect(entityA.update).to.have.been.called;
      expect(entityB.update).not.to.have.been.called;
    });
  });

  /** @test {Stage#render} */
  describe('render', () => {
    beforeEach(() => {
      entityA.render = sinon.spy(entityA.render.bind(entityA));
      entityB.render = sinon.spy(entityB.render.bind(entityB));
    });

    it('should call render for each entity', () => {
      stage.render();
      expect(entityA.render).to.have.been.called;
      expect(entityB.render).to.have.been.called;
    });

    it('should not call render for an inactive entity', () => {
      entityB.disabled = true;
      stage.render();
      expect(entityA.render).to.have.been.called;
      expect(entityB.render).not.to.have.been.called;
    });
  });
});
