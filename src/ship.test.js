import Ship from './ship.js';

describe('Ship Factory Logic', () => {
  let testCarrier;
  let testSubmarine;

  beforeEach(() => {
    testCarrier = new Ship('carrier', [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ]);
    testSubmarine = new Ship('submarine', [
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  it('Correct Props', () => {
    expect(testCarrier.ship).toBe('carrier');
    expect(testSubmarine.ship).toBe('submarine');

    expect(testCarrier.length).toBe(5);
    expect(testSubmarine.length).toBe(3);

    expect(testCarrier.hits).toEqual([]);
    expect(testSubmarine.hits).toEqual([]);
  });

  it('Gets Hit Properly', () => {
    testCarrier.hit([1, 1]);
    expect(testCarrier.hits).toEqual([[1, 1]]);

    testSubmarine.hit([0, 0]);
    expect(testSubmarine.hits).toEqual([[0, 0]]);

    testCarrier.hit([1, 3]);
    expect(testCarrier.hits).toEqual([
      [1, 1],
      [1, 3],
    ]);

    testSubmarine.hit([2, 0]);
    expect(testSubmarine.hits).toEqual([
      [0, 0],
      [2, 0],
    ]);
  });

  it('Sinks Properly', () => {
    testCarrier.hit([1, 4]);
    expect(testCarrier.isSunk()).toBe(false);

    testSubmarine.hit([2, 0]);
    expect(testSubmarine.isSunk()).toBe(false);

    testCarrier.hit([1, 2]);
    testCarrier.hit([1, 3]);
    testCarrier.hit([1, 1]);
    testCarrier.hit([1, 5]);
    expect(testCarrier.isSunk()).toBe(true);

    testSubmarine.hit([0, 0]);
    testSubmarine.hit([1, 0]);
    expect(testSubmarine.isSunk()).toBe(true);
  });
});
