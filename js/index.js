const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

// victory message
const VICTORY_MSG = "WELL DONE!";
// timeout related variables
const TIMEOUT_DURATION = 500;
let timeoutId = 0;

// initializing variables for innerHTML content
const pairsClickedElement = document.getElementById('pairs-clicked');
const pairsGuessedElement = document.getElementById('pairs-guessed');
const msgElement = document.getElementById('end-msg');

// helper functions to update the score board
function updateScoreBoard() {
  pairsClickedElement.textContent = memoryGame.pairsClicked;
  pairsGuessedElement.textContent = memoryGame.pairsGuessed;
}
function displayVictoryMessage() {
  msgElement.textContent = VICTORY_MSG;
}

// helper functions to adjust the state of cards depending on gameplay
function blockCard(card) {
  if (!card.classList.contains('blocked')) card.classList.add('blocked');
}
function turnCard(card) {
  if (!card.classList.contains('turned')) card.classList.add('turned');
}
function unturnCard(card) {
  if (card.classList.contains('turned')) card.classList.remove('turned');
}

// action when 2 cards clicked, ready to be checked
function checkClickedPair() {
  // getting cards' names
  const cardName1 = memoryGame.pickedCards[0].getAttribute('data-card-name');
  const cardName2 = memoryGame.pickedCards[1].getAttribute('data-card-name');
  
  // check if pair
  if (memoryGame.checkIfPair(cardName1, cardName2)) {
    // pair guessed: applying blockCard to both cards
    blockCard(memoryGame.pickedCards[0]);
    blockCard(memoryGame.pickedCards[1]);

    // check if game finished
    if (memoryGame.checkIfFinished()) {
      // game over: no more cards
      displayVictoryMessage();
    }
  }
  else {
    // bad guess: applying unturnCard on both cards
    unturnCard(memoryGame.pickedCards[0])
    unturnCard(memoryGame.pickedCards[1])
    // now waiting for new card          
  }
  
  // emptying pickedCards for next round and updating the score board
  memoryGame.pickedCards = [];
  updateScoreBoard();
  
  // clearing current timeout to avoid pollution
  clearTimeout(timeoutId);
}


window.addEventListener('load', (event) => {
  // Add all the divs to the HTML after shuffling cards
  let html = '';
  memoryGame.shuffleCards();
  memoryGame.cards.forEach((pic) => {
    html += `
    <div class="card" data-card-name="${pic.name}">
    <div class="back" name="${pic.img}"></div>
    <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
    </div>
    `;
  });  
  document.querySelector('#memory-board').innerHTML = html;
  
  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      
      // applying turnCard to the picked card and storing it in pickedCards array
      turnCard(card);
      memoryGame.pickedCards.push(card);

      // adapting depending on how many cards clicked
      if (memoryGame.pickedCards.length === 2) {
        // setting timeout to be able to see both cards turned
        timeoutId = setTimeout(() => {
          checkClickedPair();
        }, TIMEOUT_DURATION);
      }

    });
  });
});
