let rgbTask = document.getElementById("rgb-task");
let colorsPlace = document.getElementById("colors-place");
let color = document.getElementsByClassName("color");
let scoreCounter = document.getElementById("score-counter");
let message = document.getElementById("message");
let messageContainer = document.querySelector(".message-container")
let check = document.getElementsByClassName("check-icon");
let arr;
let rgb;
let winBox;
let score = 0;

let difficulty = 1;   
let easy = document.getElementById("easy");
let normal = document.getElementById("normal");
let hard = document.getElementById("hard");

/* Create random RGB and Random position */
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let getRandomRgb = () => [random(0, 255) , random(0, 255) , random(0, 255)];

/*Generate colors */

const getColors = () => {
  colorsPlace.innerHTML= '';
  if (difficulty === 0) {
    for (i = 0; i < 3; i++) 
    {
    colorsPlace.style.gridTemplateColumns = "10rem 10rem 10rem"
    colorsPlace.style.gridTemplateRows = "10rem"
    colorsPlace.innerHTML += `<li class="color" style="background:rgb(${getRandomRgb()})"></li>`
    };
  }
  else if (difficulty === 1) {
    for (i = 0; i < 6; i++) 
    {
    colorsPlace.style.gridTemplateColumns = "10rem 10rem 10rem"
    colorsPlace.style.gridTemplateRows = "10rem 10rem"
    colorsPlace.innerHTML += `<li class="color" style="background:rgb(${getRandomRgb()})"></li>`
    };
  }
  else if (difficulty === 2) {
    for (i = 0; i < 18; i++) 
    {
    colorsPlace.style.gridTemplateColumns = "5rem 5rem 5rem 5rem 5rem 5rem"
    colorsPlace.style.gridTemplateRows = "5rem 5rem 5rem"
    colorsPlace.innerHTML += `<li class="color" style="background:rgb(${getRandomRgb()})"></li>`
    };
  }
  arr = Array.from(color);
  appear();
};
getColors();

function appear() {
  messageContainer.classList.add("active")
  setTimeout(() => {  
    messageContainer.classList.remove("active")
  }, 1000);
}

/* Generate round */ 
const newRound = () => 
{
  message.style.color = "#000";
  message.innerText = "PICK THE COLOR!";
  scoreCounter.innerText = `${score}`;
  
  winBox = arr[Math.floor(Math.random() * arr.length)];
  rgbTask.innerText = `${winBox.style.background.toUpperCase()}`;
  /* Picked non-winning color */
  arr.map(col => {
    if (col.style.background !== winBox.style.background) 
  {
    col.addEventListener("click", function() {
      message.style.color = "#fe2712";
      appear();
      message.innerText = "TRY AGAIN!";
      if (score > 0)
      {
        if (difficulty === 0) 
        {
          score -= 1
        }
        else if (difficulty === 1 && score > 1) 
        {
          score -= 2
        }
        else if (difficulty === 2 && score > 2) 
        {
          score -= 3 
        }
      }
      scoreCounter.innerText = `${score}`;
      winPick();
      setTimeout(() => 
      {
        getColors();
        newRound();        
      }, 2000); 
    });
    
  }
  });
  /* Picked winning color */
  winBox.addEventListener("click", function() 
  {
    message.style.color = "#66b032";
    appear();
    message.innerText = "EXACTLY!";
    if (difficulty === 0) 
    {
      score += 1
    }
    else if (difficulty === 1) 
    {
      score += 5
    }
    else if (difficulty === 2) 
    {
      score += 10
    }
    scoreCounter.innerText = `${score}`;
    
      winPick();
      setTimeout(() => 
      {
        getColors();
        newRound();
      }, 2000);
  });
};
newRound();
const winPick = () => 
  {
    arr.map(col => 
    {
      col.style.background = `${winBox.style.background}`;
      col.style.transform = "rotateY(180deg)";
      col.style.borderRadius = "15px";
    });
  };

/* SIDEBAR */
let htp = document.querySelector("#htp");
let sidebar = document.querySelector(".sidebar"); 


htp.onclick = function() {
  sidebar.classList.toggle("active")
};

/* Difficulty settings */
var btnContainer = document.querySelector(".difficulty-levels")

var btns = btnContainer.getElementsByClassName("difficulty-level");

for (var i = 0; i < btns.length; i++) {
  var current = document.getElementsByClassName("activeLevel");
  btns[i].addEventListener("click", function() {
    current[0].className = current[0].className.replace(" activeLevel", "");
    this.className += " activeLevel";
    btnsArr = Array.from(btns);
    difficulty = btnsArr.indexOf(current[0])
    score = 0;
    getColors()
    newRound()
  });
}
