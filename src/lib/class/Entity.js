import { Effect } from './Effects';

export default class Entity {
  constructor() {
    this.diplayName = 'unknown'
    this.name = 'unknown';
    this.id = 0;
    this.type = 0; // player/enemy/neutral/allied/chest/terminal/decorative
    this.behavior = 0;
    this.x = 0;
    this.y = 0;

    this.stats = {
      level: 1,

      hp: 5,
      maxHp: 5,

      armor: 0,
      evasion: 0,

      baseDmg: 1,
      critChance: 0,
      critDmg: 0,
      accuracy: 0,
      fireRate: 1,

      poisonDmg: 0,
      electricityDmg: 0,
      magneticDmg: 0,
      coldDmg: 0,
      fireDmg: 0,

      strength: 0,
      agility: 0,
      intelligence: 0,
      fame: 0,
      luck: 0,
    };

    this.status = {
      poison: 0,
      electricity: 0,
      magnetic: 0,
      cold: 0,
      fire: 0,
    }

    this.cyberdeck = {
      type: 'none',
      address: '127.0.0.1',
      power: 1,
      defense: 1,
      software: [],
    }
  }

  takeDamage(attacker, game) {
    const dmg = attacker.stats.baseDmg;
    this.stats.hp -= dmg;

    const effect = new Effect(this.x, this.y, 'DMG', -dmg);
    game.effectManager.addEffect(effect);
  }

  ai(game) {
    if (this.type == 1 && this.behavior == 1) {

      // death condition
      if (this.stats.hp <= 0) {
        game.map.entities.splice(game.map.entities.indexOf(this), 1);
      }

      let dX = this.x;
      let dY = this.y;

      const decision = Math.random();

      if (decision < 0.5) {
        if (dX < game.player.x)
          dX++;
        else
          dX--;
      }
      else {
        if (dY < game.player.y)
          dY++;
        else
          dY--;
      }

      if (game.player.x == dX && game.player.y == dY) {
        game.player.takeDamage(this, game);
        return;
      }

      if (game.map.canMove(dX, dY)) {
        this.x = dX;
        this.y = dY;
      }
    }
  }
}