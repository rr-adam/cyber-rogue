export class EffectManager {
  constructor() {
    this.effectQueue = [];
  }

  addEffect(effect) {
    this.effectQueue.push(effect);
  }

  progressEffects() {
    for (const effect of this.effectQueue) {
      effect.delay -= 1;
    }

    this.effectQueue = this.effectQueue.filter(effect => {
      return effect.delay > 0;
    });
  }
}

export class Effect {
  constructor(x, y, type, data, delay) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.data = data;
    this.id = Math.random();
    this.delay = delay || 0;
  }
}