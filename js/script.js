const pointsUserElement = document.getElementById('points-user');
const pointsPcElement = document.getElementById('points-pc');

const mainElement = document.getElementById('main');

const firstStepElement = document.getElementById('first-step');
const secondStepElement = document.getElementById('second-step');

const pickedUserContainer = document.getElementById('picked-user-container');
const pickedUserImage = document.getElementById('picked-user-image');

const gameResultElement = document.getElementById('game-result');

const pickedPcContainer = document.getElementById('picked-pc-container');
const pickedPcImage = document.getElementById('picked-pc-image');

const playAgainElement = document.getElementById('play-again');

const GAME_MODE = document.body.dataset.gameMode;
const GAME_OPTIONS = ['rock', 'scissors', 'paper'];

const GAME_RULES = {
  rock: {
    paper: false,
    scissors: true,
    lizard: true,
    spock: false
  },
  scissors: {
    rock: false,
    paper: true,
    lizard: true,
    spock: false
  },
  paper: {
    rock: true,
    scissors: false,
    lizard: false,
    spock: true
  },
  lizard: {
    rock: false,
    paper: true,
    scissors: false,
    spock: true
  },
  spock: {
    rock: true,
    paper: false,
    scissors: true,
    lizard: false
  }
};

let currentScreen = 1;
let pcSelection;
let userSelection;
let pointsUser = 0;
let pointsPc = 0;

if (GAME_MODE === 'advanced') {
  GAME_OPTIONS.push('lizard', 'spock');
}

const changeScreen = () => {
  console.log(pcSelection, userSelection);
  if (currentScreen === 1) {
    currentScreen = 2;
    firstStepElement.classList.remove('first-step--show');
    secondStepElement.classList.add('second-step--show');
  } else {
    currentScreen = 1;
    firstStepElement.classList.add('first-step--show');
    secondStepElement.classList.remove('second-step--show');
    pickedPcContainer.classList.remove(
      'game-item--show',
      `game-item--${pcSelection}`
    );
    pickedUserContainer.classList.remove(
      'game-item--show',
      `game-item--${userSelection}`
    );
  }
};

const updateScore = () => {
  pointsPcElement.textContent = pointsPc;
  pointsUserElement.textContent = pointsUser;
};

const checkWinner = (userPlay, pcPlay) => {
  if (userPlay === undefined || pcPlay === undefined) {
    console.log('ERROR');
    return;
  }

  if (userPlay === pcPlay) {
    gameResultElement.textContent = 'DRAW';
    return;
  }

  if (GAME_RULES[userPlay][pcPlay]) {
    gameResultElement.textContent = 'YOU WIN';
    pointsUser++;
  } else {
    pointsPc++;
    gameResultElement.textContent = 'YOU LOSE';
  }

  updateScore();
};

const printResults = (userSelection, pcSelection) => {
  console.log(userSelection, '---', pcSelection);
  pickedUserContainer.classList.add(`game-item-${userSelection}`);
  pickedUserImage.src = `images/icon-${userSelection}.svg`;
  pickedPcImage.src = `images/icon-${pcSelection}.svg`;
  pickedPcContainer.classList.add(`game-item-${pcSelection}`);

  const timeoutId = setTimeout(() => {
    pickedPcContainer.classList.add(`game-item--show`);
    pickedUserContainer.classList.add(`game-item--show`);
    clearInterval(timeoutId);
  }, 100);
};

const optionsSelection = () => {
  pcSelection = selectPcElement();
  printResults(userSelection, pcSelection);

  checkWinner(userSelection, pcSelection);
};

const selectPcElement = () => {
  const result = Math.floor(Math.random() * GAME_OPTIONS.length);
  return GAME_OPTIONS[result];
};

firstStepElement.addEventListener('click', ev => {
  if (ev.target.classList.contains('game-item__image')) {
    changeScreen();
    userSelection = ev.target.dataset.element;
    optionsSelection();
  }
});

playAgainElement.addEventListener('click', () => {
  changeScreen();
});
