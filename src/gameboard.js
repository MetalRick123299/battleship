import Ship from './ship.js';

export default class Gameboard {
  constructor() {
    this.grid = this.init();
    this.ships = [];
  }

  init() {
    let returnArr = [];
    for (let i = 0; i < 10; i++) {
      let newArr = [];
      for (let j = 0; j < 10; j++) {
        newArr.push({ hasShip: false, ship: {}, isShot: false });
      }
      returnArr.push(newArr);
    }

    return returnArr;
  }

  checkGrid() {
    let mainArr = [];
    this.grid.forEach((ele) => {
      const newArr = ele.map((item) => {
        const hasShip = item.hasShip ? 'X' : '';
        const isShot = item.isShot ? 'S' : '';
        return `${hasShip}${isShot}`;
      });
      mainArr.push(newArr);
    });

    console.log(mainArr);
  }

  createShip(startingCoords, ship, isX_Axis) {
    const shipsLength = {
      carrier: 5,
      battleship: 4,
      destroyer: 3,
      submarine: 3,
      patrolBoat: 2,
    };

    let shipPos = [];

    if (this.grid[startingCoords[0]][startingCoords[1]].hasShip)
      return 'Other Ship in Starting';

    for (let i = 0; i < shipsLength[ship]; i++) {
      let newCoords = startingCoords.slice(0);
      const index = isX_Axis ? 1 : 0;

      if (newCoords[index] + i > 9 && i != 0) return 'Does Not Fit on Board';
      newCoords[index] = newCoords[index] + i;

      if (this.grid[newCoords[0]][newCoords[1]].hasShip)
        return 'Other Ship in Place';

      shipPos.push(newCoords);
    }

    const newShip = new Ship(ship, shipPos);

    for (let i = 0; i < shipPos.length; i++) {
      const currPos = shipPos[i];
      const y = currPos[0];
      const x = currPos[1];

      console.log(`${y}`);
      this.grid[y][x].hasShip = true;
      this.grid[y][x].ship = newShip;
    }

    this.ships.push(newShip);

    return shipPos;
  }

  receiveAttack(coords) {
    const coordsObj = this.grid[coords[0]][coords[1]];

    coordsObj.isShot = true;
    if (coordsObj.hasShip) {
      return coordsObj.ship.hit(coords);
    } else {
      return coordsObj.isShot;
    }
  }

  isAllSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
