import Entity from './Entity';
import Inventory from './Inventory';

export default class Player extends Entity {
  constructor() {
    super();
    this.inventory = new Inventory();

    this.weapon = null;
    this.armor = null;
  }

  move(direction, map) {
    let targetX = this.x;
    let targetY = this.y;

    if (direction == 'up')
      targetY--;
    else if (direction == 'down')
      targetY++;
    else if (direction == 'left')
      targetX--;
    else if (direction == 'right')
      targetX++;

    if (map.canMove(targetX, targetY)) {
      this.x = targetX;
      this.y = targetY;
    }
  }
}