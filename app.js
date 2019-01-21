/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, prevDice1, prevDice2;
var musicBg = new Audio('gamebg.mp3')
var clickSound = new Audio('click2.mp3')
var ggSound = new Audio('gameover.mp3')
var rollSound = new Audio('roll.mp3')
var holdSound = new Audio('hold.mp3')
var winSound = new Audio('win.mp3')

newGame()


function onRoll() {
    musicBg.pause()
    if (gamePlaying) {


        var dice = Math.floor(Math.random() * 6) + 1;
        
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        var dice2DOM = document.querySelector('.dice2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        if ((dice === 6 && prevDice1 === 6) || (dice2 === 6 && prevDice2 === 6)) {
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            ggSound.play()

            nextPlayer()
        } else {
            if (dice !== 1 && dice2 !== 1) {
                rollSound.play()
                roundScore += dice + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                ggSound.play()
                nextPlayer();
            }
        }

        prevDice1 = dice;
        prevDice2 = dice2;

        
    }
}


function onHold() {
    if (gamePlaying) {
        holdSound.play()
        scores[activePlayer] += roundScore 
    
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // var winScore = document.getElementById("winScore").value
        if (scores[activePlayer] >= 100) {
            winSound.play()
            document.querySelector('#name-' + activePlayer).textContent = 'winner';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        } 
    }
}

function nextPlayer() {
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; 

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    if (activePlayer === 0) {
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
    } else {
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    }
}

function newGame() {
    clickSound.play()

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'none';
    var dice2DOM = document.querySelector('.dice2');
    dice2DOM.style.display = 'none';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
}
