export default class Ship {
  constructor(_ship, _position) {
    this.ship = _ship;
    this.position = _position;
    this.length = _position.length;
    this.hits = [];
  }

  hit(pos) {
    this.hits.push(pos);
  }

  isSunk() {
    if (this.position.sort().join(',') === this.hits.sort().join(',')) {
      return true;
    } else {
      return false;
    }
  }
}
