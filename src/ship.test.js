import Ship from './ship.js';

describe('Ship Factory Logic', () => {
  let testCarrier;
  let testSubmarine;

  beforeEach(() => {
    testCarrier = new Ship('carrier', [12, 13, 14, 15, 16]);
    testSubmarine = new Ship('submarine', [1, 11, 21]);
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
    testCarrier.hit(12);
    expect(testCarrier.hits).toEqual([12]);

    testSubmarine.hit(1);
    expect(testSubmarine.hits).toEqual([1]);

    testCarrier.hit(14);
    expect(testCarrier.hits).toEqual([12, 14]);

    testSubmarine.hit(21);
    expect(testSubmarine.hits).toEqual([1, 21]);
  });

  it('Sinks Properly', () => {
    testCarrier.hit(15);
    expect(testCarrier.isSunk()).toBe(false);

    testSubmarine.hit(21);
    expect(testSubmarine.isSunk()).toBe(false);

    testCarrier.hit(13);
    testCarrier.hit(14);
    testCarrier.hit(12);
    testCarrier.hit(16);
    expect(testCarrier.isSunk()).toBe(true);

    testSubmarine.hit(1);
    testSubmarine.hit(11);
    expect(testSubmarine.isSunk()).toBe(true);
  });
});
