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
let newGame = document.getElementById("new-game-button");
let hit = document.getElementById("hit-button");
let stay = document.getElementById("stay-button");
let winnerArea = document.getElementById("winner-area");

// images Bender
let benderWin = document.getElementById("benderW");
let benderLose = document.getElementById('benderL');

function hideBender() {
    benderWin.style.visibility = 'hidden';
    benderLose.style.visibility = 'hidden';
}

function showBenderWin(){
    benderWin.style.visibility = 'visible';
}

function showBenderLose (){
    benderLose.style.visibility = 'visible';
}

// add click event
newGame.addEventListener("click", startNewGame);

hideGameButton();
hideBender();

hit.addEventListener("click", function () {
    player.push(drawCard());
    showHands();
});

stay.addEventListener("click", function () {
    hideGameButton();
    while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
        dealer.push(drawCard());
        showHands(true);
    }
});


// cards
function dealInitialCards() {
    dealer.push(drawCard());
    player.push(drawCard());
    showHands();
}

function showHand(hand, score) {
    let cards = "";
    for (let h in hand) {
        // cards += hand[h].value + hand[h].card + ' ';
        cards += cardSymbol(hand[h]);
    }
    return cards + " score: " + score;
}

function showHands(stayed = false) {
    playerScore = calculateHand(player);
    dealerScore = calculateHand(dealer);
    outputArea.innerHTML = showHand(player, playerScore) + "<br>" + showHand(dealer, dealerScore);
    let winner = determineWinner(stayed);
    winnerArea.innerHTML = winner;
    if (winner !== "") {
        hideGameButton();
    }
}

// Calculate Hand Value
function calculateHand(cards) {
    let score = 0;
    let found = cards.find(function (card) {
        return card.value == 'A';
    });
    cards.forEach(function (card) {
        if (card.value == 'A') { score += 1; }
        else if (card.value == "J" || card.value == "Q" || card.value == "K") { score += 10; }
        else score += 1 * card.value;
    });
    if (found && score <= 21 - 10) { score += 10; }
    return score;
};

// start a new game
function startNewGame() {
    showGameButton();
    deck = [];
    player = [];
    dealer = [];
    shuffleDeck();
    dealInitialCards();
};

//  determinate the winner
function hasBlackJack(hand, score) {
    return hand.length == 2 && score == 21;
}

function isBust(score) {
    return score > 21;
}

function determineWinner(stayed) {
    if (isBust(playerScore)) {
        showBenderWin();
        return dealerWins;
    }
    else if (isBust(dealerScore)) {
        showBenderLose();
        return playerWins;
    }
    else if (dealerCards.length == 5 && dealerScore <= 21) {
        showBenderWin();
        return dealerWins;
    }
    else if (stayed) {
        if (dealerScore == playerScore) {
            return draw;
        }
        else if (playerScore > dealerScore) {
            showBenderLose();
            return playerWins;
        }
        else if (dealerScore > playerScore) {
            showBenderWin();
            return dealerWins + " larger score";
        }
    }
    else {
        let dealerBJ = hasBlackJack(dealer, dealerScore);
        let playerBJ = hasBlackJack(player, playerScore);
        if (playerBJ && dealerBJ) {
            return draw;
        }
        else if (dealerBJ) {
            showBenderWin();
            return dealerWins + " Black jack!";
        }
    }

    return "";
}


function showGameButton() {
    newGame.style.visibility = 'hidden';
    hit.style.visibility = 'visible';
    stay.style.visibility = 'visible';
}
// 
function hideGameButton() {
    newGame.style.visibility = 'visible';
    hit.style.visibility = 'hidden';
    stay.style.visibility = 'hidden';
}

// create constant variable
const dealerWins = "Dealer Win! Sorry! You lose.";
const playerWins = "You Win!";
const draw = "Draw";

// create table to pick unicode cards
function cardSymbol(card) {
    let suit = "";
    if (card.card == "♠") {
        suit = "a";
    }
    else if (card.card == "♥") {
        suit = "b";
    }
    else if (card.card == "♦") {
        suit = "c";
    }
    else if (card.card == "♣") {
        suit = "d";
    }
    let value = card.value;
    if (card.value == "10") {
        value = "a";
    }
    else if (card.value == "J") {
        value = 'b';
    }
    else if (card.value == "Q") {
        value = 'd';
    }
    else if (card.value == "K") {
        value = 'e';
    }
    else if (card.value == "A") {
        value = '1';
    }
    let symbol = "&#x1f0" + suit + value + ";";
    if (suit == "b" || suit == "c") {
        return '<span style="color:red">' + symbol + '</span>';
    }
    return symbol;

}


