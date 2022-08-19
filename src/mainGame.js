import Ai from './players';
import Gameboard from './gameboard';
import { getNodeIndex, playerGameboard } from './startingArea';

let isPlayerTurn = true;

const playerGrid = document.querySelector('#playerGrid');
const aiGrid = document.querySelector('#aiGrid');

let aiGameboard;
let aiPlayer;

export function setUpMainGame() {
  aiGameboard = new Gameboard();
  aiPlayer = new Ai(aiGameboard, playerGameboard);

  playerGameboard.grid.forEach((row, rowIndex) => {
    row.forEach((ele, eleIndex) => {
      if (ele.hasShip) {
        const nodeIndex = rowIndex * 10 + eleIndex;
        playerGrid.children[nodeIndex].classList.add('addedShip');
      }
    });
  });

  aiPlayer.setUpShips();
  aiGameboard.checkGrid();

  Array.from(aiGrid.children).forEach((gridItem) => {
    gridItem.addEventListener('click', attackOpp);
  });
}

function attackOpp(e) {
  const currElement = e.target;
  const textArea = document.querySelector('.textArea');

  console.log();
  if (!isPlayerTurn) return;
  if (currElement.classList.contains('hitShot')) return;
  if (currElement.classList.contains('missShot')) return;

  const coordsString = getNodeIndex(currElement).toString();
  const coords = coordsString[1]
    ? [parseInt(coordsString[0]), parseInt(coordsString[1])]
    : [0, parseInt(coordsString[0])];

  if (aiGameboard.receiveAttack(coords) === true) {
    currElement.classList.add('missShot');
    textArea.textContent = `It's a Miss`;
  } else {
    currElement.classList.add('hitShot');
    textArea.textContent = `It's a Hit`;
  }

  if (aiGameboard.isAllSunk()) return WinScreen('Player');
  isPlayerTurn = false;
  aiTurn();
}

function aiTurn() {
  aiPlayer.attack();
  const coords = aiPlayer.prevMove;
  const nodeIndex = parseInt(`${coords[0]}${coords[1]}`);

  if (playerGameboard.grid[coords[0]][coords[1]].hasShip) {
    playerGrid.children[nodeIndex].classList.add('hitShot');
  } else {
    playerGrid.children[nodeIndex].classList.add('missShot');
  }
  if (playerGameboard.isAllSunk()) return WinScreen('AI');
  console.log(coords);
  isPlayerTurn = true;
}

function WinScreen(winner) {
  const overlay = document.querySelector('.overlay');
  const winnerPopUp = document.querySelector('#winnerPopUp');

  console.log(`${winner} is the Winner`);

  winnerPopUp.textContent = `The Winner is The ${winner}`;
  overlay.classList.add('active');
  winnerPopUp.classList.add('active');
}
