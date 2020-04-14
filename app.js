/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, activePlayer, roundScore, dice, gamePlay;


// Initlizing the initial zero state
reset();

/*
 Implementing the dice rooling function
*/

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlay) {

        // Random Number generation between 1 and 6
        var dice = Math.floor(Math.random()*6)+1;


        // Updating the dice image
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+ dice + '.png';


        // Updating the Score if not 1
        if (dice !== 1){
            
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 

        } else {
            // Next player
            nextPlayer();
        }

    }
});


/*
 Implementing the Hold button implementation
*/

document.querySelector('.btn-hold').addEventListener('click' , function() {

    if (gamePlay) {

        // Updating the Global Score

        scores[activePlayer] += roundScore;

        // Changing the UI

        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        // Changing the course of winning value

        var input = document.querySelector('.target_score').value;
        if (input) {
            winning_score = input;
        }else {
            winning_score =50;
        }

        // Checking for the any player win

        if (scores[activePlayer] >= winning_score) {
            document.querySelector('#name-'+activePlayer).textContent = ' Winner! ';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer+ '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer+ '-panel').classList.remove('active');
            gamePlay = false;
        } else {
            // Next Player
            nextPlayer();
        }

    }
});


/*
 Implementing the New game implementation
*/

document.querySelector('.btn-new').addEventListener('click' , reset);


function nextPlayer(){

    activePlayer === 0? activePlayer = 1 : activePlayer = 0 ;
    roundScore = 0;

    document.getElementById('current-0').innerText = 0;
    document.getElementById('current-1').innerText = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';

}

function reset() {

    scores =[0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlay =true;

    document.querySelector('.dice').style.display = 'none'; 

    document.getElementById('score-0').innerText = 0;
    document.getElementById('score-1').innerText = 0;
    document.getElementById('current-0').innerText = 0;
    document.getElementById('current-1').innerText = 0;

    document.querySelector('#name-0').textContent = ' PLAYER 1 ';
    document.querySelector('#name-1').textContent = ' PLAYER 2'; 
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}