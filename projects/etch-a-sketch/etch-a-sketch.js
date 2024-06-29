const btnGridSize       = document.querySelector("#btn-grid-size");
const btnRandomColors   = document.querySelector("#btn-mode-random-color");
const btnProgDarkening  = document.querySelector("#btn-mode-progressive-darkening");
const btnClear          = document.querySelector("#btn-clear");

const easContainer      = document.querySelector(".l-eas");
const initialGridSize   = 16;
const initBgColor       = "white";

let easTileColoringMode = 0;
let easTileColor        = "black"; 
let easTileOpacity      = 1;

function getRandomRGBValue() {
  return Math.floor(Math.random() * 256);
}

function initGrid(gridSize) {
  for(let i = 0; i < (gridSize ** 2); i++) {
    let gridTile = document.createElement("div")
    
    gridTile.setAttribute("style", `width: calc(100% / ${gridSize});`);
    easContainer.appendChild(gridTile);
  }
}



window.addEventListener("load", () => {
  initGrid(initialGridSize);
  console.log("Loaded grid");

  
});



btnGridSize.addEventListener("click", () => {
  const newGridSize = Number(prompt("Enter Grid Size:"));
  
  const easNodes = document.querySelector(".l-eas").children;
  let currentTotalTiles = Object.keys(easNodes).length;

  if((newGridSize ** 2) != currentTotalTiles) {
    while(easContainer.firstChild){
      easContainer.removeChild(easContainer.lastChild);
    }
  }

  initGrid(newGridSize);
});



btnRandomColors.addEventListener("click", () => {
  easTileColoringMode = 1;
});



btnProgDarkening.addEventListener("click", () => {
  easTileColoringMode = 2;
  easTileColor        = "black";
  easTileOpacity      = 0;
});



btnClear.addEventListener("click", () => {
  const easNodes = document.querySelector(".l-eas").children;

  for(let key in easNodes) {
    easNodes[key].style.backgroundColor = initBgColor;
  }
});



easContainer.addEventListener("mouseover", (elem) => {
  switch(easTileColoringMode) {
    case 1:
      easTileOpacity = 1;
      easTileColor = `rgb(${getRandomRGBValue()}, ${getRandomRGBValue()}, ${getRandomRGBValue()})`
      break;
    
    case 2:
      const currentTileOpacity = Number(elem.target.style.opacity);

      if(currentTileOpacity < 1) {
        easTileOpacity = currentTileOpacity + 0.1;

      } else {
        easTileOpacity = currentTileOpacity;
      }
      break;

    default:
      easTileColor = "black";
  }

  elem.target.style.backgroundColor = easTileColor;
  elem.target.style.opacity         = easTileOpacity;

});












