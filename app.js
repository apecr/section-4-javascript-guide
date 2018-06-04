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

const scores = [0, 0];
let roundScore = 0;
let activePlayer = 1;

document.querySelector(DICE_SELECTOR).style.display = 'none';

document.querySelector('.btn-roll').addEventListener(CLICK, () => {
  // 1. Random number
  let dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the result
  const diceSelect = document.querySelector(DICE_SELECTOR);
  diceSelect.style.display = 'block';
  diceSelect.src = `dice-${dice}.png`;

  // 3. Update the round score IF the rolled number was not a 1

});
