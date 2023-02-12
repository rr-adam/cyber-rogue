import Map from './Map';
import Player from './Player';
import RNG from './RNG';
import { EffectManager } from './Effects';

export default class Game {

  constructor(seedString) {
    this.stage = 1;

    this.rng = new RNG(seedString);
    this.player = new Player();
    this.player.stats.baseDmg = 2;
    this.player.stats.maxHp = 30;
    this.player.stats.hp = 30;
    this.map = new Map();
    this.effectManager = new EffectManager();

    this.map.generate(this.rng, this.stage);
    [this.player.x, this.player.y] = this.map.playerStart;
  }

  step(type, data) {
    this.effectManager.progressEffects();

    this.handlePlayerAction(type, data);

    this.handleEntityLogic();
  }

  handlePlayerAction(type, data) {
    if (type == 'move')
      this.handlePlayerMove(data);
  }

  handlePlayerMove(dir) {
    let destinationX = this.player.x;
    let destinationY = this.player.y;

    if (dir == 'up')
      destinationY--;
    else if (dir == 'down')
      destinationY++;
    else if (dir == 'left')
      destinationX--;
    else if (dir == 'right')
      destinationX++;

    let entityAtDestination = this.map.getEntityAt(destinationX, destinationY);

    if (entityAtDestination != null) {
      this.handleEntityInteraction(entityAtDestination);
      return;
    }

    if (this.map.terrain[destinationY][destinationX] == 3) {
      this.nextStage();
      return;
    }

    if (this.map.canMove(destinationX, destinationY)) {
      this.player.x = destinationX;
      this.player.y = destinationY;
    }
  }

  handleEntityInteraction(entity) {
    if (entity.type == 1)
      entity.takeDamage(this.player, this);
  }

  handleEntityLogic() {
    for (const entity of this.map.entities) {
      entity.ai(this);
    }
  }

  nextStage() {
    this.stage++;
    this.map.generate(this.rng, this.stage);
    [this.player.x, this.player.y] = this.map.playerStart;
  }
}