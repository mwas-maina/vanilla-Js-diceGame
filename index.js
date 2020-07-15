function init() {
  gameOn = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  // makes scores and everything 0

  document.getElementById("score-0").innerHTML = "0";
  document.getElementById("score-1").innerHTML = "0";
  document.getElementById("current-0").innerHTML = "0";
  document.getElementById("current-1").innerHTML = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

var scores,
  roundScore,
  activePlayer,
  gameOn = true,
  last;
init();

//creates a  variable to store  dice class and put the dice invisible on windows load
var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";

var roll = document
  .querySelector(".btn-roll")
  .addEventListener("click", function () {
    if (gameOn) {
      //produces the random number after click
      var dice = Math.floor(Math.random() * 7);
      //select the dice src
      var diceDom = document.querySelector(".dice");
      //show the dice after rolling

      diceDom.style.display = "block";
      //update the counter
      diceDom.src = `img/dice-${dice}.png`;
      // add the scores
      if (last === 6 && dice === 6) {
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = "0";

        switchPlayers();
      } else if (dice !== 1) {
        roundScore += dice;
        document.getElementById(
          "current-" + activePlayer
        ).textContent = roundScore;
      } else {
        //next player
        switchPlayers();
      }
      last = dice;
    }
  });

var hold = document
  .querySelector(".btn-hold")
  .addEventListener("click", function () {
    if (gameOn) {
      scores[activePlayer] += roundScore;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      //check if player woons
      if (scores[activePlayer] > 100) {
        document.querySelector("#name-" + activePlayer).textContent =
          "Congrats.You won the game";
        diceDom.style.display = "none";
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.add("winner");
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.remove("active");
        gameOn = false;
      } else {
        //next player
        switchPlayers();
      }
    }
  });

//----------this function perfoms the switching of active players if a roll equal 1--------:
function switchPlayers() {
  //sets the player 2
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = roundScore;
  document.getElementById("current-1").textContent = roundScore;
  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //hide the dice
  diceDom.style.display = "none";
}
document.querySelector(".btn-new").addEventListener("click", init);
