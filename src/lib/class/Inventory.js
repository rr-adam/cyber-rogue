export default class Inventory {
  constructor() {
    this.capacity = 20;
    this.capacityMax = 20;

    this.slots = Array(50).fill({name: ''});
  }
}