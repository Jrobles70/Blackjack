window.onload = function() {
    document.getElementById("deal").onclick = deal_cards;
    document.getElementById("hit").onclick = hit;
    document.getElementById("stand").onclick = dealer_turn;
    draw_table();
    shuffle();
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
var play_deck = [];
var canvas = document.getElementById("table");
var ctx = canvas.getContext("2d");
var new_game = true;
var p1 = {
    id: "Player",
    hand: 0,
    x: 350,
    y: 400,
    amt_cards: 0,
    hit: new Image(),
    card1: new Image(),
    card2: new Image(),
    soft_total: 0,
    is_turn: true
}
var dealer = {
    id: "Dealer",
    hand: 0,
    x: 600,
    y: 30,
    amt_cards: 0,
    hit: new Image(),
    down: new Image(),
    card1: new Image(),
    card2: new Image(),
    soft_total: 0
}

function shuffle () {
	for (i = 0; i < 3; i++){
	play_deck = play_deck.concat(deck);
	console.log(play_deck.length)
}
}


function draw_table() {
    /*
    Draws table background
    Input: None
    Return: None
    */
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //draw_card(dealer, dealer.down, 1300, 30);
    cards_left();
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
    if (new_game == false) { // this is to stop the player from dealing while it is the dealers turn
        alert("Game is still in progress");
        return
    }
    if (play_deck <= 6)
    	shuffle();
    new_game = false;
    p1.is_turn = true;
    p1.hand = 0;
    dealer.hand = 0;
    p1.amt_cards = 0;
    dealer.amt_cards = 0;
    p1.soft_total = 0;
    dealer.soft_total = 0;

    draw_table();

    // p1 first card
    draw_card(p1, p1.card1, p1.x, p1.y);

    // dealer down card
    // also gives value to face down card
    draw_card(dealer, dealer.down, dealer.x, dealer.y);
    dealer.card2.src = "Images/" + random_card() + ".png";

    // p1 2nd card
    draw_card(p1, p1.card2, p1.x - 30, p1.y - 30);
    //total_hand(p1);

    // dealer 2nd card
    draw_card(dealer, dealer.card1, dealer.x - 30, dealer.y - 30);

}

function draw_card(player, card, x, y) {
    /*
    draws card on the canvas
    Input :
            card: takes the card source from p1 or dealer object
            x: value on x axis to be drawn
            y: value on y axis to be drawn
    Return: None
    */
    player.amt_cards++;

    card.onload = function() {
        ctx.drawImage(card, 0, 0, card.width, card.height, x, y, 160, 240);
    }
    if (card == dealer.down)
        card.src = "Images/back.png";
    else {
        card.src = "Images/" + random_card() + ".png";
        cards_left();
        total_hand(player, card);
    }
}

function total_hand(player, card) {
    /*
    Function called after initial hand is dealt. Will add up the total you have been dealt and will check for 
    a Blackjack
    input:
          player: This will take any of the player var names p1 and dealer
    return:
          Player.hand: Will return the number you hand adds up to.
    FIXME: There is a console log instead of return for testing reasons
    */
    var card_to_add = card.src;
    // runs twice and finds the first letter or number of card from the src value ex. 'a' from "...Images/ace_of_spades.png"
    var count = card_to_add.length - 1;
    while (card_to_add[count] != '/') {
        count--;
    }
    // removes everything but the first letter or number of card
    card_to_add = card_to_add.slice(count + 1, count + 2);
    if (card_to_add == 'a') {
        player.hand += 11;
        player.soft_total += 1;
    } else if ((isNaN(card_to_add)) || (card_to_add == 1)) {
        player.hand += 10;
        player.soft_total += 10;
    } else {
        player.hand += parseInt(card_to_add);
        player.soft_total += parseInt(card_to_add);
    }
    if ((player.hand > 21) && (player.hand != player.soft_total))
    // this will change the players hand to the soft total if the hard total has busted
        player.hand = player.soft_total;
    if (player.amt_cards > 1) {
        console.log(player.id + " " + player.hand);
        draw_score(player);
    }

}

function draw_score(player) {
    x = player.x - 300;
    y = player.y + 100;
    ctx.fillStyle = "green";
    ctx.fillRect(x, y - 30, 130, 100);
    ctx.fillStyle = "black";
    ctx.font = "30px Ariel";
    ctx.fillText(player.id, x, y);
    if (player.hand == 21) {
        ctx.fillText("Blackjack!", x, y + 50)
        player.is_turn = false;
        new_game = true;
        dealer_turn();
        return
    } else if (player.hand > 21) {
        ctx.fillText(player.hand + " Bust!", x, y + 50);
        player.is_turn = false;
        new_game = true;
        return
    }
    if ((player.soft_total != player.hand) && (player == p1)) {
        ctx.fillText(player.hand, x, y + 50);
        ctx.fillText(" or " + player.soft_total, x + 30, y + 50);
    } else
        ctx.fillText(player.hand, x, y + 50);
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

function dealer_turn() {
	if (new_game == true){
		alert("Press deal card to continue.")
		console.log(p1.is_turn, new_game)
		return
	}
    p1.is_turn = false;
    ctx.drawImage(dealer.card2, 0, 0, dealer.card2.width, dealer.card2.height, dealer.x, dealer.y, 160, 240);
    total_hand(dealer, dealer.card2);
    while (dealer.hand <= 16){
    	move_x = dealer.x + (p1.amt_cards - 1) * 30;
    	move_y = dealer.y + (p1.amt_cards - 1) * 30;
    	draw_card(dealer, dealer.hit, move_x, move_y);
    	dealer.hit = new Image();
    }
    new_game = true;
}

function deal_animation() {
    /*
    Called to create an animation that shows card moving from the deck to player hand
    FIXME
    */
}

function hit() {
    /*
    Called when the dealer needs to hit or when the player hits the button on the canvas.
    This will call the draw_card, total_hand, and check_bust
    */
    if (p1.is_turn == false || new_game == true) { // stops the player from hitting again while it is the dealers turn
        alert("Press deal card to continue");
        console.log(p1.is_turn, new_game)
        return
    }
    move_x = p1.x - p1.amt_cards * 30;
    move_y = p1.y - p1.amt_cards * 30;
    draw_card(p1, p1.hit, move_x, move_y);
}

function help() {
    /*
	FIXME: This function can be used to help the player make a decision 
	*/

}