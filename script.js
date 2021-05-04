'use strict';


const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activeplayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  playing = true; // 0 means yes - 1 means no
  diceEl.classList.add('hidden');
  document.querySelector(`.player--0`).classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
}

const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent = currentScore;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});
init();

btnHold.addEventListener('click', function () {

  if (playing) {
    console.log('Hold Button');
    // 1. Add current score to the score of the active player
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];
    if (scores[activeplayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
      document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
    } else {
      switchPlayer();
    }
    // Check if the score is >= 100
    // Finish the game
    // or else Switch to the next player...
  }
});

btnNew.addEventListener('click', init);