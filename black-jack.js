// Creating a Collection of Cards 
// create array 
let cards = [];
let suits = ["♠", "♦", "♣", "♥"];
let values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];


// create cards
for (let v in values) {
    for (let s in suits) {
        cards.push({ card: suits[s], value: values[v] })
    }
}

// Shuffling the deck 
let deck = [];
function shuffleDeck() {
    let tmpDeck = cards.slice();
    while (tmpDeck.length > 0) {
        let pos = Math.floor(Math.random() * tmpDeck.length);
        let card = tmpDeck.splice(pos, 1);
        deck.push(...card);
    }
};
shuffleDeck();
console.log(deck);

// Draw a Card
function drawCard() {
    return deck.shift();
};
// create single card 
function oneCard(card) {
    return card.card + card.value;
}

// Show hands
let dealer = [];
let player = [];
let outputArea = document.getElementById('output-area');
let playerCards = "";
let dealerCards = "";
let playerScore = 0;
let dealerScore = 0;

function dealInitialCards() {
    dealer.push(drawCard());
    player.push(drawCard());
    playerScore = calculateHand(player);
    dealerScore = calculateHand(dealer);
}

function showHand(hand, score) {
    let cards = "";
    for (let h in hand) {
        cards += hand[h].value + hand[h].card + ' ';
    }
    return cards + " score: " + score;
}

clearTable();
dealInitialCards();
outputArea.innerHTML = showHand(player, playerScore) + "<br>" + showHand(dealer, dealerScore);

function clearTable() {
    outputArea.innerHTML = '';
}

// Calculate Hand Value
function calculateHand(cards) {
    let score = 0;
    let found = cards.find(function (card) {
        return card.value == 'A';
    });
    cards.forEach(function (card) {
        if (card.value == 'A') { score += 1; }
        else if (card.value == 'J' || card.value == "Q" || card.value == "K") { score += 10; }
        else score += 1*card.value;
    });
    if (found && score <= 21 - 10) { score += 10; }
    return score;
};



// create table to pick unicode cards


