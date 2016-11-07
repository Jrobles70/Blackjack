window.onload = function() {
    document.getElementById("deal").onclick = deal_cards;
    shuffle();
    draw_table();
}

//              Standard Blackjack
var deck = [ // This is the deck key used to make new arrays that can be spliced to take out cards that are pulled
    "2_of_clubs",
    "2_of_diamonds",
    "2_of_hearts",
    "2_of_spades",
    "3_of_clubs",
    "3_of_diamonds",
    "3_of_hearts",
    "3_of_spades",
    "4_of_clubs",
    "4_of_diamonds",
    "4_of_hearts",
    "4_of_spades",
    "5_of_clubs",
    "5_of_diamonds",
    "5_of_hearts",
    "5_of_spades",
    "6_of_clubs",
    "6_of_diamonds",
    "6_of_hearts",
    "6_of_spades",
    "7_of_clubs",
    "7_of_diamonds",
    "7_of_hearts",
    "7_of_spades",
    "8_of_clubs",
    "8_of_diamonds",
    "8_of_hearts",
    "8_of_spades",
    "9_of_clubs",
    "9_of_diamonds",
    "9_of_hearts",
    "9_of_spades",
    "10_of_clubs",
    "10_of_diamonds",
    "10_of_hearts",
    "10_of_spades",
    "jack_of_clubs",
    "jack_of_diamonds",
    "jack_of_hearts",
    "jack_of_spades",
    "queen_of_clubs",
    "queen_of_diamonds",
    "queen_of_hearts",
    "queen_of_spades",
    "king_of_clubs",
    "king_of_diamonds",
    "king_of_hearts",
    "king_of_spades",
    "ace_of_clubs",
    "ace_of_diamonds",
    "ace_of_hearts",
    "ace_of_spades"
];
play_deck = []; //Used to make a deck with multiple decks of cards
var canvas = document.getElementById("table");
var ctx = canvas.getContext("2d");
var p1 = {
    hand: 0,
    x: 600,
    y: 400,
    amt_cards: 0,
    card1: new Image(),
    card2: new Image(),
    sft_ttl: 0
}
var dealer = {
    hand: 0,
    x: 200,
    y: 0,
    amt_cards: 0,
    down: new Image(),
    card1: new Image(),
    card2: new Image(),
    sft_ttl: 0
}

function shuffle() {
    /*
    Creates a new deck for the current game
    Gets called when the window loads or when cards run out
    Input: None
    Return: None
    */

    play_deck = deck;
}

function draw_table() {
    /*
    Draws table background
    Input: None
    Return: None
    */
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw_card(dealer, dealer.down, 1300, 30);
    cards_left();
    ctx.fillStyle = "black";
    ctx.font = "30px Ariel";
    ctx.fillText("Dealer", 75, 100);
}

function cards_left() {
    ctx.fillStyle = "green";
    ctx.fillRect(1310, 0, 200, 29);
    ctx.fillStyle = "black";
    ctx.font = "20px Ariel";
    ctx.fillText("Cards Left: " + play_deck.length, 1310, 25);
}

function random_card() {
    /*
    Function called from the drawCard function to "draw" a random card
    It will pick a random card in play_deck and remove it
    Input: None
    Return: 
            rand_card: this is a random card from the play_deck array.
    */
    var rand = Math.floor(Math.random() * play_deck.length);
    var rand_card = play_deck[rand];
    play_deck.splice(rand, 1);
    return rand_card
}


function deal_cards() {
    /*
    Function deals cards to players and dealer
    Deals in correct order. Players first dealer last
    Input: None
    Return: None
    */

    // p1 first card
    draw_card(p1, p1.card1, 600, 400);


    // dealer down card
    // also gives value to face down card
    draw_card(dealer, dealer.down, 230, 30);
    dealer.card2.src = "Images/" + random_card() + ".png";

    // p1 2nd card
    draw_card(p1, p1.card2, 570, 370);
    total_hand(p1);


    // dealer 2nd card
    draw_card(dealer, dealer.card1, 200, 0);

}

function draw_card(player, card, x, y) {
    /*
    draws card on the canvas
    Input :
            card: takes the card source from p1, p2, p3, or dealer object
            x: value on x axis to be drawn
            y: value on y axis to be drawn
    Return: None
    */
    player.amt_cards++;
    if (card == dealer.down)
        card.src = "Images/back.png";
    else
        card.src = "Images/" + random_card() + ".png";
    card.onload = function() {
        ctx.drawImage(card, 0, 0, card.width, card.height, x, y, 160, 240);
    }
    cards_left();
}

function total_hand(player) {
    /*
    Function called after initial hand is dealt. Will add up the total you have been dealt and will check for 
    a Blackjack
    input:
          player: This will take any of the player var names p1, p2, p3, dealer
    return:
          Player.hand: Will return the number you hand adds up to.
    FIXME: There is a console log instead of return for testing reasons
    */
    var first = player.card1.src;
    var second = player.card2.src;
    var cards_to_add = [first, second];
    // runs twice and finds the first letter or number of card from the src value ex. 'a' from "...Images/ace_of_spades.png"
    for (i = 0; i < 2; i++) {
        var card_amt = cards_to_add[i];
        var count = card_amt.length - 1;
        while (card_amt[count] != '/') {
            count--;
        }
        // removes everything but the first letter or number of card
        // EX: cards_to_add = ['q', 9]
        cards_to_add[i] = cards_to_add[i].slice(count + 1, count + 2);
        // since the above logic just gets the first letter or number this fixes
        // 10s coming up as 1s
        if (cards_to_add[i] == 1)
            cards_to_add[i] = 10
            // if the values is not a number (face card or ace) it will add the correct amount
        if (cards_to_add[i] == 'a') {
            player.hand += 11;
            player.sft_ttl = player.card1 + 1;
        } else if (isNaN(cards_to_add[i]))
            player.hand += 10;
        else
            player.hand += parseInt(cards_to_add[i]);

    }
    console.log(player.hand);
}


function check_cards() {
    /*
    Function to check if the dealer has enough cards to make a new game
    Input: None
    Return: None
    FIXME: This function is currently set up to to check if play_deck is out of cards
    */
    if (play_deck.length < 1) {
        alert("OUT OF CARDS");
        return true;

    }

}

function check_bjack(){
    /*
    Checks player and dealer hand for a blackjack
    FIXME
    */
}

function winnings() {
    /*
    Function to do math on how much you won
    FIXME
    */
}

function draw_chips() {
    /*
    draws chips according to how much money the player has 
    in $100 $50 $20 $5 $1 chips
    FIXME
    */
}

function hit() {
    /*
    Called when the dealer needs to hit or when the player hits the button on the canvas.
    This will call the draw_card, total_hand, and check_bust
    */
}

function check_bust() {
    /*
    Will check hand after hit for a bust
    */
}



function stop() {
    /*
    Function when you lose all your money/ want to stop
    FIXME
    */
}

function help() {
    /*
    Function for help/hints on what to do
    FIXME
    */
}


function sidebet() {
    /*
    Function called from winning to see if you won a side bet. Only used in some Blackjack games
    FIXME
    */
}
