const btnGridSize       = document.querySelector("#btn-grid-size");
const btnRandomColors   = document.querySelector("#btn-mode-random-color");
const btnProgDarkening  = document.querySelector("#btn-mode-progressive-darkening");
const btnClear          = document.querySelector("#btn-clear");

const easContainer      = document.querySelector(".l-eas");

btnGridSize.addEventListener("click", () => {
  return prompt("Enter Grid Size:");
});

btnRandomColors.addEventListener("click", () => {

});

btnProgDarkening.addEventListener("click", () => {

});

btnClear.addEventListener("click", () => {
  
});

let gridSize = 15
for(let i = 0; i < gridSize * gridSize; i++) {
  let fragment = document.createElement("div")

  fragment.setAttribute("style", 
                        `width: calc(100% / ${gridSize});`);
  easContainer.appendChild(fragment);
}




const easContainerFragments = document.querySelector(".l-eas");
easContainerFragments.addEventListener("mouseover", (elem) => {
  elem.target.style.backgroundColor = "red";
});

