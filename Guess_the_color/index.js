let colorGenerator = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return [red, green, blue];
};
let totalAmountOfTime = 1 ;
let time = totalAmountOfTime * 60;
let timer;
let curscore = 0;
let cnt = 0;
let bestScore = localStorage.getItem("BestScore") || 0; // Load best score or default to 0

let cntDown=document.getElementsByClassName("count-down")[0];
//console.log(cntDown);
document.getElementsByClassName("best-score")[0].innerText = `Best Score: ${bestScore}`;

cntDown.addEventListener("click", () => {
  if (!timer) {
    startGame();
  }
});

//To check ans
function selectedAns(e) {

  
  let scoreDiv = document.getElementsByClassName("cur-score")[0];

  if (e.target.style.backgroundColor === guessColor.style.backgroundColor) {

    document.getElementsByClassName("right-wrong").innerText = "Correct Answer ";
    curscore += 10; // Increment score
    scoreDiv.innerText = `Score: ${curscore}`;

  } else {
    document.getElementsByClassName("right-wrong").innerText = "Wrong Answer";
    curscore -= 5;
    scoreDiv.innerText = `Score: ${curscore} `; 
  }

  if (curscore >= bestScore) {
    bestScore = curscore;
    localStorage.setItem("BestScore", bestScore);
  }
  
  // if (cnt > 10) {
  //   // Update best score in UI before reloading
  //   document.getElementsByClassName("best-score")[0].innerText = `Best Score: ${bestScore}`;

  //   alert(`Game Over! Your Final Score is ${curscore}`);
  //   location.reload(); // Reload the page to restart the game
  //   return;
  // }
  cnt++;

  if (time > 0) startGame();
}

let options = document.getElementsByClassName("squares");
let guessColor = document.getElementsByClassName("Guess-the-color")[0];
let randomColor = null;

let startGame = () => {
  randomColor = colorGenerator();
 
  
  guessColor.style.backgroundColor = `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`;
  guessColor.innerText = "What is this color ?";
  guessColor.style.color = ` #ffff`;
  guessColor.style.fontSize = "26px";
  guessColor.style.fontFamily="sans-serif"; 
  guessColor.style.fontWeight = "bolder";
  //console.log(options);
  let ansId = Math.floor(Math.random() * 3);
  for (let i = 0; i < options.length; i++) {
    let color = colorGenerator();
    if (i === ansId) {
      options[
        i
      ].style.backgroundColor = `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`;
    } else {
      options[
        i
      ].style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      //console.log(options[i].style.backgroundColor);
    }
  }
 
  
  if(!timer) {
    timer = setInterval(countDown,1000);
  
  }
  let optionContainer;
 
   optionContainer = document.getElementsByClassName("option-container")[0]; // Access the first element
  optionContainer.addEventListener("click", selectedAns);
};






function countDown(){
  const min = Math.floor(time/60);
  let sec=time%60;
  cntDown.innerText = `${min}:${sec}`;

  time--;
  console.log(timer + " in CountDown");
  if(time<0){
    clearInterval(timer);
    timer=null;
    resetGame();
   
    
  } 
  console.log(time);
  
}

function resetGame() {
  // Create an overlay for the "Game Over" screen
  let overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Semi-transparent dark background
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";

  // Create a container for the message
  let resultContainer = document.createElement("div");
  resultContainer.style.textAlign = "center";
  resultContainer.style.padding = "20px";
  resultContainer.style.width = "80%";
  resultContainer.style.backgroundColor = "#f3f4f6"; // Light gray background
  resultContainer.style.color = "#333"; // Dark text color
  resultContainer.style.borderRadius = "10px";
  resultContainer.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

  // Game Over message
  let timeOverDiv = document.createElement("div");
  timeOverDiv.innerText = `⏰ Time Over!`;
  timeOverDiv.style.color = "red";
  timeOverDiv.style.fontSize = "24px";
  timeOverDiv.style.fontWeight = "bold";
  resultContainer.appendChild(timeOverDiv);

  // Score display
  let scoreDiv = document.createElement("div");
  scoreDiv.innerText = `Your Score: ${curscore} | Best Score: ${bestScore}`;
  scoreDiv.style.fontSize = "20px";
  scoreDiv.style.marginTop = "10px";
  scoreDiv.style.fontWeight = "500";
  resultContainer.appendChild(scoreDiv);

  // Add a restart prompt
  let restartDiv = document.createElement("div");
  restartDiv.innerText = "Restarting in 3 seconds...";
  restartDiv.style.marginTop = "15px";
  restartDiv.style.fontSize = "16px";
  restartDiv.style.color = "#555";
  resultContainer.appendChild(restartDiv);

  // Append the resultContainer to the overlay
  overlay.appendChild(resultContainer);

  // Append the overlay to the body
  document.body.appendChild(overlay);

  // Reload the page after a short delay
  setTimeout(() => location.reload(), 5000);
}


