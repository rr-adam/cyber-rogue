import Entity from './Entity';
import Tile from './Tile';

export default class Map {
  // contains 2d array 'terrain'
  // constains entity array
  // -------
  // tile representation:
  // 0 - empty
  // 1 - wall
  // 2 - floor
  // 3 - elevator

  constructor() {
    this.terrain = [];
    this.entities = [];
    this.rooms = [];
    this.lastEntityId = 0;
    this.sizeX = 0;
    this.sizeY = 0;
    this.stage = 1;

    this.playerStart = [0, 0];

    this.setup = {
      MAX_NODE_SIZE: 16,
      MIN_NODE_SIZE: 9,
      MIN_ROOM_SIZE: 6,
    }
  }

  generate(rng, stage) {
    this.rooms = [];
    this.entities = [];
    this.stage = stage;
    const entityCountTarget = 4 + stage;

    this.sizeX = 20 + (stage * 5);
    this.sizeY = 20 + (stage * 2);

    // fill array with empty space
    this.terrain = [];
    for (let i = 0; i < this.sizeY; i++) {
      this.terrain.push([]);
      for (let j = 0; j < this.sizeX; j++) {
        this.terrain[i].push(0);
      }
    }

    // bsp
    const BSParray = [];

    const root = new BSPnode(0, 0, this.sizeX, this.sizeY);
    BSParray.push(root);

    // split terrain
    let didSplit = true;
    while (didSplit) {
      didSplit = false;
      for (let i = 0; i < BSParray.length; i++) {
        let current = BSParray[i];
        if (current.left == null && current.right == null) {
          if (
            current.width > this.setup.MAX_NODE_SIZE ||
            current.height > this.setup.MAX_NODE_SIZE ||
            rng.rand() > 0.25
          ) {
            if (current.split(rng, this.setup)) {
              BSParray.push(current.left);
              BSParray.push(current.right);
              didSplit = true;
            }
          }
        }
      }
    }
    root.createRooms(rng, this.setup);

    // draw rooms
    for (const node of BSParray) {
      if (node.room != null) {
        this.rooms.push(node.room);
        for (let i = node.room.y; i < node.room.y + node.room.height; i++) {
          for (let j = node.room.x; j < node.room.x + node.room.width; j++) {
            if (
              i == node.room.y ||
              i == node.room.y + node.room.height - 1 ||
              j == node.room.x ||
              j == node.room.x + node.room.width - 1
            )
              this.terrain[i][j] = 1;
            else
              this.terrain[i][j] = 2;
          }
        }
      }
    }

    // draw halls
    for (const node of BSParray) {
      if (node.halls?.length > 0) {
        for (const hall of node.halls)
          for (let i = hall.y; i < hall.y + hall.height; i++) {
            for (let j = hall.x; j < hall.x + hall.width; j++) {
              this.terrain[i][j] = 2;
            }
          }
      }
    }

    // spawn entities
    for (let i = 0; i < entityCountTarget; i++) {
      const nE = new Entity();
      nE.type = 1;
      nE.id = this.lastEntityId;
      this.lastEntityId++;
      nE.behavior = 1;
      const decision = rng.rand();
      nE.name = decision > 0.5 ? 'punk2' : 'heavy1';
      nE.displayName = decision > 0.5 ? 'Punk' : 'Heavy unit';

      // pick room
      let room = null;
      do {
        room = this.rooms[rng.randMinMaxInt(1, this.rooms.length - 2)];
      } while (room.capacity == room.entityCount);

      room.entityCount++;

      [nE.x, nE.y] = this.findPositionForSpawn(room, rng);

      this.entities.push(nE);
    }

    // find position for player
    let playerRoom = this.rooms[0];
    this.playerStart = this.findPositionForSpawn(playerRoom, rng);

    // find position for elevator
    let room = null;
    do {
      room = this.rooms[rng.randMinMaxInt(1, this.rooms.length - 2)];
    } while (room.capacity == room.entityCount);
    const [elevatorX, elevatorY] = this.findPositionForSpawn(room, rng);

    this.terrain[elevatorY][elevatorX] = 3;
  }

  findPositionForSpawn(room, rng) {
    let pX, pY;
    const x = room.x + 2;
    const y = room.y + 2;
    const maxX = x + room.width - 6;
    const maxY = y + room.height - 6;
    do {
      pX = rng.randMinMaxInt(x, maxX);
      pY = rng.randMinMaxInt(y, maxY);
    } while (this.getEntityAt(pX, pY) != null);

    return [pX, pY];
  }

  canMove(x, y) {
    if (x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY)
      return false;

    if (this.terrain[y][x] != 2)
      return false;

    if (this.getEntityAt(x, y) != null)
      return false;

    return true;
  }

  getEntityAt(x, y) {
    for (const entity of this.entities) {
      if (entity.x == x && entity.y == y)
        return entity;
    }

    return null;
  }

  getTerrainRectangle(xCenter, yCenter, xDistance, yDistance) {
    const terrainRectangle = [];
    for (let y = yCenter - yDistance, index = 0; y < yCenter + yDistance; y++, index++) {
      terrainRectangle.push([]);
      terrainRectangle[index].id = y;
      for (let x = xCenter - xDistance; x < xCenter + xDistance; x++) {
        let tile = new Tile(x, y, 0);
        if (
          x >= 0 &&
          y >= 0 &&
          y < this.sizeY &&
          x < this.sizeX
        ) {
          tile.setType(this.terrain[y][x]);
        }

        terrainRectangle[index].push(tile);
      }
    }

    return terrainRectangle;
  }
}

class Room {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.entityCount = 0;
    this.entityCapacity = (width - 3) * (height - 3);
  }
}

class Hall {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

class BSPnode {
  // BSP algorithm for map generation adapted from
  // https://gamedevelopment.tutsplus.com/tutorials/how-to-use-bsp-trees-to-generate-game-maps--gamedev-12268
  // check it out, nice tutorial

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.room = null;
    this.halls = null;

    this.left = null;
    this.right = null;
  }

  split(rng, setup) {
    if (this.left != null || this.right != null)
      return false;

    let splitDirection = rng.rand() > 0.5 ? 'horizontal' : 'vertical';
    if (this.width > this.height && this.width / this.height >= 1.25)
      splitDirection = 'vertical';
    else if (this.height > this.width && this.height / this.width >= 1.25)
      splitDirection = 'horizontal';

    const max = (splitDirection == 'horizontal' ? this.height : this.width) - setup.MIN_NODE_SIZE;
    if (max <= setup.MIN_NODE_SIZE)
      return false;

    // split position
    const sPos = rng.randMinMaxInt(setup.MIN_NODE_SIZE, max);

    if (splitDirection == 'horizontal') {
      this.left = new BSPnode(this.x, this.y, this.width, sPos);
      this.right = new BSPnode(this.x, this.y + sPos, this.width, this.height - sPos);
    }
    else {
      this.left = new BSPnode(this.x, this.y, sPos, this.height);
      this.right = new BSPnode(this.x + sPos, this.y, this.width - sPos, this.height);
    }
    return true;
  }

  createRooms(rng, setup) {
    if (this.left != null || this.right != null) {
      if (this.left != null) {
        this.left.createRooms(rng, setup);
      }
      if (this.right != null) {
        this.right.createRooms(rng, setup);
      }

      // if there are both left and right children, create a hallway between them
      if (this.left != null && this.right != null) {
        this.createHall(this.left.getRoom(rng), this.right.getRoom(rng), rng);
      }
    }
    else {
      // make the room
      const roomSize = [
        rng.randMinMaxInt(setup.MIN_ROOM_SIZE, this.width - 2),
        rng.randMinMaxInt(setup.MIN_ROOM_SIZE, this.height - 2)
      ];
      const roomPos = [
        Math.round(rng.randMinMax(1, this.width - roomSize[0] - 1)),
        Math.round(rng.randMinMax(1, this.height - roomSize[1] - 1))
      ];
      this.room = new Room(this.x + roomPos[0], this.y + roomPos[1], roomSize[0], roomSize[1]);
    }
  }

  getRoom(rng) {
    if (this.room != null)
      return this.room;
    else {
      let lRoom;
      let rRoom;
      if (this.left != null) {
        lRoom = this.left.getRoom(rng);
      }
      if (this.right != null) {
        rRoom = this.right.getRoom(rng);
      }
      if (lRoom == null && rRoom == null)
        return null;
      else if (rRoom == null)
        return lRoom;
      else if (lRoom == null)
        return rRoom;
      else if (rng.rand() > 0.5)
        return lRoom;
      else
        return rRoom;
    }
  }

  createHall(l, r, rng) {
    if (l == null || r == null)
      return;
    let halls = [];
    let point1 = { x: rng.randMinMaxInt(l.x + 2, l.x + l.width - 4), y: rng.randMinMaxInt(l.y + 2, l.y + l.height - 4) };
    let point2 = { x: rng.randMinMaxInt(r.x + 2, r.x + r.width - 4), y: rng.randMinMaxInt(r.y + 2, r.y + r.height - 4) };
    let w = point2.x - point1.x;
    let h = point2.y - point1.y;
    if (w < 0) {
      if (h < 0) {
        if (rng.rand() < 0.5) {
          halls.push(new Hall(point2.x, point1.y, Math.abs(w) + 1, 1));
          halls.push(new Hall(point2.x, point2.y, 1, Math.abs(h) + 1));
        }
        else {
          halls.push(new Hall(point2.x, point2.y, Math.abs(w) + 1, 1));
          halls.push(new Hall(point1.x, point2.y, 1, Math.abs(h) + 1));
        }
      }
      else if (h > 0) {
        if (rng.rand() < 0.5) {
          halls.push(new Hall(point2.x, point1.y, Math.abs(w) + 1, 1));
          halls.push(new Hall(point2.x, point1.y, 1, Math.abs(h) + 1));
        }
        else {
          halls.push(new Hall(point2.x, point2.y, Math.abs(w) + 1, 1));
          halls.push(new Hall(point1.x, point1.y, 1, Math.abs(h) + 1));
        }
      }
      else // if (h == 0)
      {
        halls.push(new Hall(point2.x, point2.y, Math.abs(w) + 1, 1));
      }
    }
    else if (w > 0) {
      if (h < 0) {
        if (rng.rand() < 0.5) {
          halls.push(new Hall(point1.x, point2.y, Math.abs(w) + 1, 1));
          halls.push(new Hall(point1.x, point2.y, 1, Math.abs(h) + 1));
        }
        else {
          halls.push(new Hall(point1.x, point1.y, Math.abs(w) + 1, 1));
          halls.push(new Hall(point2.x, point2.y, 1, Math.abs(h) + 1));
        }
      }
      else if (h > 0) {
        if (rng.rand() < 0.5) {
          halls.push(new Hall(point1.x, point1.y, Math.abs(w) + 1, 1));
          halls.push(new Hall(point2.x, point1.y, 1, Math.abs(h) + 1));
        }
        else {
          halls.push(new Hall(point1.x, point2.y, Math.abs(w) + 1, 1));
          halls.push(new Hall(point1.x, point1.y, 1, Math.abs(h) + 1));
        }
      }
      else // if (h == 0)
      {
        halls.push(new Hall(point1.x, point1.y, Math.abs(w) + 1, 1));
      }
    }
    else // if (w == 0)
    {
      if (h < 0) {
        halls.push(new Hall(point2.x, point2.y, 1, Math.abs(h) + 1));
      }
      else if (h > 0) {
        halls.push(new Hall(point1.x, point1.y, 1, Math.abs(h) + 1));
      }
    }

    this.halls = halls;
  }
}