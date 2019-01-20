

var cards = document.getElementsByClassName('card');
if(cards.length > 0){
    cards[0].requestFocus();
}

function drawOptions() {
    var card = document.createElement('div');
    card.className = "card";

}