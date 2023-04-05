let highScore = localStorage.getItem('highScore');

if(!highScore) {
  highScore = 0;
}

document.getElementById("high").innerText = `High Score: ${highScore}`

const gameOverDiv = document.getElementById("game-over")
gameOverDiv.style.display = "none"

let score = 0
document.getElementById('current').innerText = `Current Score: ${score}`

const gameContainer = document.getElementById("game");
gameContainer.style.display = "none";
const boxContainer = document.getElementById('boxes')

function onStartClick() {
  let mainPage = document.getElementById("mainpage")
  mainPage.style.display = 'none';
  gameContainer.style.display = "block";
}
let button = document.getElementById('startbtn');
button.addEventListener('click', onStartClick)




const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    boxContainer.append(newDiv);
  }
}
let flipped = []
let matched = []
let canClick = true;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(!canClick) return;
  console.log("you just clicked", event.target);
  if(flipped.length < 2 && !flipped.includes(event.target) && !matched.includes(event.target)){
    event.target.classList.toggle('show');
    flipped.push(event.target);
  }
  console.log(flipped);
  if(flipped.length === 2){
    score++
    document.getElementById('current').innerText = `Current Score: ${score}`
    console.log(score)
    const colorOne = flipped[0].classList[0];
    const colorTwo = flipped[1].classList[0];
    if (colorOne === colorTwo){
      matched.push(flipped[0], flipped[1])
      flipped = []
    }
    else{
      canClick = false
      setTimeout(function () {
        flipped[0].classList.toggle('show');
        flipped[1].classList.toggle('show');
        flipped = [];
        canClick = true;
      }, 1000)
    }
  }
  if(matched.length === COLORS.length){
    gameOverDiv.style.display = "block"
    const scoreDescriptionP = document.getElementById("score-desc")

    let beatHighScore = false;

    if(score < highScore || highScore === 0) {
      localStorage.setItem("highScore", score)
      beatHighScore = true;
    }

    const scoreNumberP = document.getElementById("number-text")

    scoreNumberP.innerText = score;

    scoreDescriptionP.innerText = `${beatHighScore ? ' You beat your high score! ' : ''}Your score was`
  }
} 
// keep track of people sitting at the table. only 2 people can sit there, after one comes, wait for the other, after they both come and finish they will leave so we must clear the table for the next set of people

//keep track of how many cards are flipped, only two can be flipped at one time, then we must wait until they are done, then flip them back over. if there is one, wait for the second

//


// when the DOM loads
createDivsForColors(shuffledColors);

function removeChildDivs(parent){
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}
}

function onRestartClick(){
  score = 0
  flipped = []
  matched = []
  shuffledColors = shuffle(COLORS);
  removeChildDivs(boxContainer);
  createDivsForColors(shuffledColors);
  document.getElementById('current').innerText = `Current Score: ${score}`
  gameOverDiv.style.display = "none"
}


let restartButt = document.getElementById('restartbtn');
restartButt.addEventListener('click', onRestartClick)

let restartModalBtn = document.getElementById('restart-modal-btn');
restartModalBtn.addEventListener('click', onRestartClick)