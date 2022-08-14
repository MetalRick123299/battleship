import Gameboard from './gameboard.js';

export default class Ai {
  constructor(board, oppBoard) {
    this.board = board;
    this.oppBoard = oppBoard;
    this.prevMove;
  }

  setUpShips() {
    const ships = [
      'carrier',
      'battleship',
      'destroyer',
      'submarine',
      'patrolBoat',
    ];

    let usedCoords = [];
    let i = 0;
    while (i != ships.length) {
      let tempCoords = [
        Math.round(Math.random() * 9),
        Math.round(Math.random() * 9),
      ];

      if (usedCoords.some((coords) => coords === tempCoords)) continue;
      const newShipPos = this.board.createShip(
        tempCoords,
        ships[i],
        Math.random() > 0.5 ? true : false
      );

      if (typeof newShipPos === 'string') continue;
      newShipPos.forEach((coords) => {
        usedCoords.push(coords);
      });

      i++;
    }

    return 'Happy Path';
  }

  attack() {
    let tempCoords = [
      Math.round(Math.random() * 9),
      Math.round(Math.random() * 9),
    ];

    if (
      this.prevMove &&
      this.oppBoard.grid[this.prevMove[0]][this.prevMove[1]].hasShip
    ) {
      const y = this.prevMove[0];
      const x = this.prevMove[1];
      const adjAttacks = [
        [y + 1, x],
        [y - 1, x],
        [y, x + 1],
        [y, x - 1],
      ];
      const shuffled = adjAttacks.sort(() => 0.5 - Math.random())[0];
      tempCoords = shuffled;
    }

    if (!this.oppBoard.receiveAttack(tempCoords)) {
      this.attack();
    }
    this.prevMove = tempCoords;
  }
}
