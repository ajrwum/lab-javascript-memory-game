class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    // add the rest of the class properties here
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    // ensuring a deck of cards exists
    if (!this.cards) return;

    // getting a new independent copy of the deck of cards
    let currentDeck = [...this.cards];
    // initializing the future shuffled deck of cards
    const shuffledDeck = [];

    // looping through the copy deck of cards
    while (currentDeck.length > 0) {
      // getting a random index depending on the size of the currentDeck
      const randomIdx = Math.floor(Math.random() * currentDeck.length);
      // pushing the item to the shuffledDeck array
      shuffledDeck.push(currentDeck[randomIdx]);
      // splicing this item from the currentDeck --> length decreases
      currentDeck.splice(randomIdx, 1);
    }

    // updating this.cards with the shuffledDeck
    this.cards = [...shuffledDeck];
    return this.cards;
  }

  checkIfPair(card1, card2) {
    // comparing pairsClicked with half the size of cards
    // counting tries
    this.pairsClicked++;
    // comparing the 2 cards
    if (card1 === card2) {
      // good guess
      this.pairsGuessed++;
      return true;
    }
    else {
      // no luck
      return false;
    }
  }

  checkIfFinished() {
    // comparing pairsClicked with half the size of cards
    if (this.pairsGuessed === this.cards.length / 2) return true;
    else return false;
  }
}

// The following is required for automated testing. Please, ignore it.
if (typeof module !== 'undefined') module.exports = MemoryGame;
