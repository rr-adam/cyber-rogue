export default class RNG {
  constructor(seedString) {
    this.seed = this.xmur3(seedString);
    this.rand = this.mulberry32(this.seed());
  }

  xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function () {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
    }
  }

  mulberry32(a) {
    return function () {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
  }

  randMinMax(min, max) {
    return this.rand() * (max - min + 1) + min;
  }

  randMinMaxInt(min, max) {
    return Math.round(this.rand() * (max - min + 1) + min);
  }
}