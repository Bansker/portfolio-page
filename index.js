const wrapper = document.querySelector('.wrapper');


let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;



const stickSrc = './svg/stick.svg';
const stick = document.createElement('img');

stick.style.transform = `translate(${windowWidth/2}px, ${windowHeight/2}px) rotate(0deg)`;
stick.src = stickSrc;
wrapper.appendChild(stick);

const elposY = window.scrollY + stick.getBoundingClientRect().top
const elposX = window.scrollX + stick.getBoundingClientRect().left
console.log(`X = ${elposX}, Y = ${elposY}`);

window.addEventListener('mousemove', (e) => {
  let mouseX = e.clientX;
  let mouseY = e.clientY;

  // 
  let posDiffX = mouseX - elposX; // A
  let posDiffY = mouseY - elposY; // G
  let hypothenuse = Math.sqrt(posDiffX**2 + posDiffY**2);
  let alpha = Math.asin(posDiffY / hypothenuse);
  console.log(`alpha: ${alpha}°`);

  //console.log(`X = ${mouseX}, Y = ${mouseY}`);
  //stick.style.transform = `translate(${windowWidth/2}px, ${windowHeight/2}px) rotate(${mouseX}deg)`;
  
  
});
