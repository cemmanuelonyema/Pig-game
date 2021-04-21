'use strict';

// selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//functions
const gameInit = function () {// game initialization and also reseting
    playing = true;
 
      scores = [0, 0]
      currentScore = 0;
      activePlayer = 0;
 
     score0El.textContent = 0;
     score1El.textContent = 0;
     current0El.textContent = 0;
     current1El.textContent = 0;
 
     diceEl.classList.add('hidden');
     player0.classList.remove('player--winner');
     player1.classList.remove('player--winner');
     player0.classList.add('player--active');
     player1.classList.remove('player--active');
 }
 gameInit();

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

//btn-roll functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //generate a no
        const diceNo = Math.trunc((Math.random() * 6) + 1);

        //display the number
        diceEl.classList.remove('hidden');
        diceEl.src = ` ./img/dice-${diceNo}.png`

        //if 1 is not rolled 
        if (diceNo !== 1) {
            //add dice to current score & display new score
            currentScore += diceNo;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //switch player
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        //add current scores to global score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //if its >= 20
        if (scores[activePlayer] >= 100) {
            //finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //switch player
            switchPlayer();
        }
    }

})

btnNew.addEventListener('click', gameInit );