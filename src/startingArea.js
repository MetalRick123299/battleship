import Gameboard from './gameboard';

let isVertical = false;
const playerGameboard = new Gameboard();

const rotate = document.querySelector('#rotate');

function rotatePlacement() {
  const placementGrid = document.querySelector('#placementGrid');
  placementGrid.classList.toggle('vertical');
  isVertical = !isVertical;
  console.log(isVertical);
}
rotate.addEventListener('click', rotatePlacement);

const startingGridItems = document.querySelectorAll(
  '#placementGrid > .gridItem'
);

let currentIndex = 0;
const ships = [
  { name: 'carrier', length: 5 },
  { name: 'battleship', length: 4 },
  { name: 'destroyer', length: 3 },
  { name: 'submarine', length: 3 },
  { name: 'patrolBoat', length: 2 },
];

function addShip(e) {
  const position = getGridElementsPosition(getNodeIndex(e.target));

  const coords = [position.row, position.column];
  console.log(`${position.row}, ${position.column} -- ${position.index}`);

  const currShip = ships[currentIndex];
  if (
    !Array.isArray(
      playerGameboard.createShip(coords, currShip.name, !isVertical)
    )
  ) {
    return;
  }

  const gridItemArr = e.target.parentNode.children;
  console.log('Placed Ship');
  for (let i = 0; i < currShip.length; i++) {
    const index = isVertical ? position.index + i * 10 : position.index + i;
    gridItemArr[index].classList.add('addedShip');
  }

  if (currShip.name === 'patrolBoat') return switchingToGame();

  currentIndex++;
  const root = document.documentElement;
  root.style.setProperty(
    '--ship-length',
    `${100 * ships[currentIndex].length}%`
  );

  const startingText = document.querySelector('#popUp > h1');
  startingText.textContent = `Place your ${
    ships[currentIndex].name == 'patrolBoat'
      ? 'Patrol Boat'
      : `${ships[currentIndex].name[0].toUpperCase()}${ships[
          currentIndex
        ].name.slice(1)}`
  }`;
}

startingGridItems.forEach((gridItem) => {
  gridItem.addEventListener('click', addShip);
});

function switchingToGame() {
  const overlay = document.querySelector('.overlay');
  const popUp = document.querySelector('#popUp');

  popUp.classList.remove('active');
  overlay.classList.remove('active');
}

function getGridElementsPosition(index) {
  const gridEl = document.getElementById('placementGrid');

  const colCount = window
    .getComputedStyle(gridEl)
    .gridTemplateColumns.split(' ').length;

  const rowPosition = Math.floor(index / colCount);
  const colPosition = index % colCount;

  //Return an object with properties row and column
  return { row: rowPosition, column: colPosition, index: index };
}

function getNodeIndex(elm) {
  var c = elm.parentNode.children,
    i = 0;
  for (; i < c.length; i++) if (c[i] == elm) return i;
}
