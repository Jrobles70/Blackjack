window.onload = function() {
    document.getElementById("deal").onclick = deal_cards;
    shuffle();
    draw_table();
}


// Change Canvas color 
// Add buttons to canvas 
//	Hit
//	Stand
//	Surrender
//	Split
//	Double Down
//	Help
//	etc.

//				Standard Blackjack
var deck = [	
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
var dealer_down = new Image();
var dealer_up = new Image();
var player_card = new Image();

function shuffle() {
	play_deck = deck
}

function draw_table() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to control randomized decks 
function random_card() {
	var rand = Math.floor(Math.random() * play_deck.length);
	play_deck.splice(rand,1)
	return play_deck[rand]
}

// Function to do math on how much you won
function winnings() {

}

// Function for the dealer (hit or stand)
function deal_cards() {
	if (check_cards()){
		return
	}
	//player 0

	//player 1
	draw_card(player_card, 1300, 400)
	//player 2

	dealer_down.onload = function() {
        ctx.drawImage(dealer_down, 730, 30);
    };
    dealer_down.src = "Images/back.png";

	draw_card(dealer_up, 700, 0)

}

function draw_card(card, x, y){
	card.src = "Images/" + random_card() + ".png"
	card.onload = function() {
        ctx.drawImage(card, 0, 0, card.width, card.height, x, y, 160, 240);
    }; 
}

function check_cards() {
	if (play_deck.length < 1) {
		alert("OUT OF CARDS");
		return true;

	}

}

// Function when you lose all your money/ want to stop
function stop() {

}
// Function for help/hints on what to do
function help() {

}

// Function for side bets
function sidebet() {

}
