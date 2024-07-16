const wrapper = document.querySelector('.wrapper');
const density = 100;

const stickSrc = './svg/stick_smaller.svg';

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;


let elements = [];
for(let i = 0; i < density; i++) {
  let randAngle  = Math.floor(Math.random() * 360);
  let randXrange = Math.floor(Math.random() * windowWidth);
  let randYrange = Math.floor(Math.random() * windowHeight);

  elements[i] = document.createElement('img');
  elements[i].src = stickSrc;
  elements[i].setAttribute('style', `transform: scale(1) translate(${randXrange}px, ${randYrange}px) rotate(${randAngle}deg);
                                     filter: invert(61%) sepia(46%) saturate(5056%) hue-rotate(2deg) brightness(102%) contrast(101%);`);
  
  wrapper.appendChild(elements[i]);
}

document.addEventListener('mousemove', (e) => {
  elements.forEach((shift) => {
    const max = 300;

    const position = Math.round(Math.random()) * 2 - 1;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const elY = window.scrollY + shift.getBoundingClientRect().top;
    const elX = window.scrollX + shift.getBoundingClientRect().left;
    let randAngle  = Math.floor(Math.random() * 360);

    const x = (elX + position);
    const y = (elY + position);
    shift.setAttribute('style', `transform: translate(${x}px, ${y}px) rotate(${randAngle}deg);
                                 filter: invert(61%) sepia(46%) saturate(5056%) hue-rotate(2deg) brightness(102%) contrast(101%);`);
                                 
  });
});


/* let elements = [];
for(let i = 0; i < density; i++) {
  let randXrange = Math.floor(Math.random() * windowWidth);
  let randYrange = Math.floor(Math.random() * windowHeight);
  let randAngle  = Math.floor(Math.random() * 360);

  elements[i] = document.createElement('img');
  elements[i].src = stickSrc;
  elements[i].setAttribute('style', `transform: translate(${randXrange}px, ${randYrange}px) rotate(${randAngle}deg);
                                     filter: invert(61%) sepia(46%) saturate(5056%) hue-rotate(2deg) brightness(102%) contrast(101%);`);
  
  wrapper.appendChild(elements[i]);
} */




















/* window.addEventListener('mousemove', (e) => {
  let mouseX = e.clientX;
  let mouseY = e.clientY;

  // 
  let ankathete = mouseX - elposX + 50; // A
  let gegenkathete = mouseY - elposY + 250; // G
  let hypothenuse = Math.sqrt(ankathete**2 + gegenkathete**2);
  let alpha = Math.asin(gegenkathete / hypothenuse) * (180 / Math.PI);



  console.log(`X: ${elposX}\nY: ${elposY}\nMX: ${mouseX}\nMY: ${mouseY}\nGK: ${gegenkathete}\nAK: ${ankathete}\nHyp: ${hypothenuse}\nWinkel: ${alpha}°`);

  //console.log(`X = ${mouseX}, Y = ${mouseY}`);
  stick.style.transform = `translate(${windowWidth/2}px, ${windowHeight/4}px) rotate(${alpha}deg)`;
}); */
