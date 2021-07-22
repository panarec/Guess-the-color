let rgbTask = document.getElementById("rgb-task");
let colorsPlace = document.getElementById("colors-place");
let color = document.getElementsByClassName("color");
let scoreCounter = document.getElementById("scoreCounter")
let next = document.getElementById("next")
let check = document.getElementsByClassName("check-icon")
let wd = document.createElement("li")
let arr
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
let getRandomRgb = () => [random(0, 255) , random(0, 255) , random(0, 255)];
let rgb;
let winBox;
let score = 0;
const getColors = () => {
  colorsPlace.innerHTML= '';
  for (i = 0; i < 6; i++) {
      colorsPlace.innerHTML += `<li class="color" style="background:rgb(${getRandomRgb()})"></li>`
  };
  arr = Array.from(color)
};
getColors()
const winPick = () => 
  {
    arr.map(col => 
    {
      col.style.background = `${winBox.style.background}`
      col.style.transform = "rotateY(180deg)"
      col.style.borderRadius = "15px"
    })
  }
const newRound = () => 
{
  next.innerText = ""
  winBox = arr[Math.floor(Math.random() * arr.length)]
  console.log(winBox);
  rgbTask.innerText = `${winBox.style.background.toUpperCase()}`
  arr.map(col => {
    if (col.style.background !== winBox.style.background) 
  {
    col.addEventListener("click", function() {
      next.style.color = "#fe2712"
      next.innerText = "NOPE!"
      winPick()
      setTimeout(() => 
      {
        getColors()
        newRound()
      }, 2000); 
    })
    
  }
  })
  winBox.addEventListener("click", function() 
  {
    next.style.color = "#66b032"
    next.innerText = "THAT´S RIGHT!"
      winPick()
      setTimeout(() => 
      {
        getColors()
        newRound()
      }, 2000);
  })
}

next.addEventListener("click", function() 
{
  getColors()
  newRound()
})
newRound()


