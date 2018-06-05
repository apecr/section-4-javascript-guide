/* global define, document */
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const CLICK = 'click';
const DICE_SELECTOR = '.dice';

let game = {};

const initialiceGame = () => ({
  scores: [0, 0],
  roundScore: 0,
  activePlayer: 0,
  gamePlaying: true
});
const prepareDom = () => {
  document.querySelector(DICE_SELECTOR).style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  game.scores.forEach((player, index) => {
    document.querySelector(`#name-${index}`).textContent = `Player ${index + 1}`;
    document.querySelector(`.player-${index}-panel`).classList.remove('winner');
    document.querySelector(`.player-${index}-panel`).classList.remove('active');
  });
  document.querySelector('.player-0-panel').classList.add('active');
};

const init = () => {
  game = initialiceGame();
  prepareDom();
};

init();


const changeUser = () => {
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  game.activePlayer = game.activePlayer === 0 ? 1 : 0;
  game.roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector(DICE_SELECTOR).style.display = 'none';
};

document.querySelector('.btn-roll').addEventListener(CLICK, () => {
  if (game.gamePlaying) {
  // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    const diceSelect = document.querySelector(DICE_SELECTOR);
    diceSelect.style.display = 'block';
    diceSelect.src = `dice-${dice}.png`;

    // 3. Update the round score IF the rolled number was not a 1
    if (dice !== 1) {
    // Add score
      game.roundScore += dice;
      document.querySelector(`#current-${game.activePlayer}`).textContent = game.roundScore;
    } else {
    // Next player
      changeUser();
    }
  }
});

document.querySelector('.btn-hold').addEventListener(CLICK, () => {
  if (game.gamePlaying) {
  // Add current score to the player global score
    game.scores[game.activePlayer] += game.roundScore;

    // Update the UI
    document.getElementById(`score-${game.activePlayer}`).textContent = game.scores[game.activePlayer];
    if (game.scores[game.activePlayer] >= 100) {
      document.querySelector(`#name-${game.activePlayer}`).textContent = 'Winner!';
      document.querySelector(DICE_SELECTOR).style.display = 'none';
      document.querySelector(`.player-${game.activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${game.activePlayer}-panel`).classList.remove('active');
      game.gamePlaying = false;
    } else {
      changeUser();
    }
  }
});

document.querySelector('.btn-new').addEventListener(CLICK, init);

/*
YOUR 3 CAHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE socre when he rolls two 6 in a row. After that, it's the next player's turn.
Hint: Always save the previous dice roll in a separate variable.
2. Add an input field to the HTML where players can set the winning score, so that they can change the
predefined score of 100. Hint: ypu can read that value with the .value property in Javascript. This is
a good oportunity to use google to figure this out.
3. Add another dice to the game, so that there are two dices now. The player looses his current score
when one of them is a 1. Hint: you will need CSS to position the second dice, so take a look at the CSS
code for the first one.
*/


