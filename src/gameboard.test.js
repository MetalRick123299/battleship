import Gameboard from './gameboard.js';

describe('Gameboard Logic', () => {
  let testGameboard;

  beforeEach(() => {
    testGameboard = new Gameboard();
  });

  it('Is Correct Size', () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(testGameboard.grid[i][j]).toEqual({
          hasShip: false,
          ship: {},
          isShot: false,
        });
      }
    }
  });

  it('Correct Placement of Ships', () => {
    expect(testGameboard.createShip([0, 4], 'carrier', true)).toEqual([
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
    ]);
    expect(testGameboard.createShip([0, 2], 'submarine', false)).toEqual([
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
  });

  it('Does Not Fit in Board', () => {
    expect(testGameboard.createShip([0, 6], 'carrier', true)).toBe(
      'Does Not Fit on Board'
    );
    expect(testGameboard.createShip([9, 0], 'carrier', false)).toBe(
      'Does Not Fit on Board'
    );
  });

  it('Other Ship in its Place', () => {
    expect(testGameboard.createShip([4, 4], 'carrier', false)).toEqual([
      [4, 4],
      [5, 4],
      [6, 4],
      [7, 4],
      [8, 4],
    ]);
    // [[4, 4], [5, 4], [6, 4], [7, 4], [8, 4],]

    expect(testGameboard.createShip([7, 3], 'submarine', true)).toBe(
      'Other Ship in Place'
    );
    // [[7, 3], [7, 4], [7, 5],]

    expect(testGameboard.createShip([3, 4], 'submarine', false)).toBe(
      'Other Ship in Place'
    );
    // [[3, 4], [4, 4], [5, 4],]

    expect(testGameboard.createShip([4, 4], 'submarine', true)).toBe(
      'Other Ship in Starting'
    );
    // [[4, 4], [4, 5], [4, 6],]

    expect(testGameboard.grid[4][4].ship.ship).toBe('carrier');
    expect(testGameboard.grid[0][4].hasShip).toBe(false);
  });

  it('Receives Attack Properly', () => {});

  it('Reports If All Ships Sunk', () => {});
});
