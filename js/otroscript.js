const userContainer = document.getElementById('user-container');
const pcContainer = document.getElementById('pc-container');
const resultElement = document.getElementById('result');
const pointsYouElement = document.getElementById('points-you');
const pointsPcElement = document.getElementById('points-pc');
const playButton = document.getElementById('play');

const gameOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

const gameRules = {
  rock: {
    scissors: true,
    lizard: true,
    paper: false,
    spock: false
  },
  scissors: {
    paper: true,
    lizard: true,
    rock: false,
    spock: false
  },
  paper: {
    rock: true,
    spock: true,
    scissors: false,
    lizard: false
  },
  lizard: {
    paper: true,
    spock: true,
    rock: false,
    scissors: false
  },
  spock: {
    rock: true,
    scissors: true,
    paper: false,
    lizard: false
  }
};

const gameImages = {
  rock: 'images/icon-rock.svg',
  scissors: 'images/icon-scissors.svg',
  paper: 'images/icon-paper.svg',
  lizard: 'images/icon-lizard.svg',
  spock: 'images/icon-spock.svg'
};

const generateRandomChoice = () => {
  const randomIndex = Math.floor(Math.random() * gameOptions.length);
  return gameOptions[randomIndex];
};

const updateInterface = (userChoice, pcChoice, result) => {
  document.getElementById('user-image').src = gameImages[userChoice];
  document.getElementById('user-image').alt = userChoice;

  document.getElementById('pc-image').src = gameImages[pcChoice];
  document.getElementById('pc-image').alt = pcChoice;

  resultElement.textContent = result;
};

const handleOptionClick = userChoice => {
  const pcChoice = generateRandomChoice();
  const userWins = gameRules[userChoice][pcChoice];

  if (userWins) {
    updateInterface(userChoice, pcChoice, 'YOU WIN');
    pointsYouElement.textContent = parseInt(pointsYouElement.textContent) + 1;
  } else if (userChoice === pcChoice) {
    updateInterface(userChoice, pcChoice, "IT'S A TIE");
  } else {
    updateInterface(userChoice, pcChoice, 'YOU LOSE');
    pointsPcElement.textContent = parseInt(pointsPcElement.textContent) + 1;
  }

  document.getElementById('main').classList.remove('main_first');
  document.getElementById('main').classList.add('main_second');
};

const handlePlayAgainClick = () => {
  document.getElementById('main').classList.remove('main_second');
  document.getElementById('main').classList.add('main_first');
};

document.querySelectorAll('.game-item').forEach(item => {
  item.addEventListener('click', () => {
    const userChoice = item.classList[1].substring(10); // Corregido a substring(10)
    handleOptionClick(userChoice);
  });
});

playButton.addEventListener('click', handlePlayAgainClick);
