export default class Tile {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.id = `${x}_${y}`;
  }

  setType(type) {
    // in case additional logic for custom tiles gets added
    this.type = type;
  }
}