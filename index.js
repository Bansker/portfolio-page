const plxWrapper = document.querySelector('.plx-wrapper');
const out = document.querySelector('.js-out');
const density = 200;

const stickSrc = './svg/stick_smaller.svg';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;



function getRandomSignedValue(range) {
  const randSign = Math.random() > 0.5 ? 1 : -1;
  const randValue = Math.floor(Math.random() * range);
  return randValue * randSign
}

function getRandomValue(range) {
  return Math.floor(Math.random() * range);
}



let sticks = [];
for(let i = 0; i < density; i++) {
  const randAngle  = getRandomValue(360);
  const randXrange = getRandomValue(windowWidth);
  const randYrange = getRandomValue(windowHeight);
  const randPositionTop = getRandomValue(100);
  const randPositionLeft = getRandomValue(100);

  sticks[i] = document.createElement('img');
  sticks[i].src = stickSrc;

  sticks[i].setAttribute('value', `${getRandomSignedValue(30)}`);

  sticks[i].setAttribute('style', `position: absolute;
                                   top: ${randPositionTop}%;
                                   left: ${randPositionLeft}%;
                                   transform: rotate(${randAngle}deg) scale(2);
                                   filter: invert(61%) sepia(46%) saturate(5056%) hue-rotate(2deg) brightness(102%) contrast(101%);`);
  
  plxWrapper.appendChild(sticks[i]);
}


document.addEventListener('mousemove', (ev) => {
  sticks.forEach((stick) => {
    const randAngle  = 5;
    const position = stick.getAttribute('value');
    const x = (window.innerWidth - ev.pageX * position) / 250;
    const y = (window.innerHeight - ev.pageY * position) / 250;

    // Stolen from https://stackoverflow.com/questions/59882504/how-to-get-style-transform-rotate-value-in-javascript
    let angle = 0;
    const rotate = stick.style.transform.match(/rotate\((\d+)(.+)\)/);
    if (rotate) {
      let [num, unit] = rotate.slice(1);  // slice is needed since first element contains entire match
      //console.log('num:', num, 'unit:', unit);
      angle = num;
    }

    stick.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${angle}deg) scale(2)`;
  });
});

window.addEventListener('deviceorientation', (ev) =>{
  out.textContent = `Alpha: ${ev.alpha}, Beta: ${ev.beta}, Gamma: ${ev.gamma}`;
});





/* 
document.addEventListener('mousemove', (e) => {
  sticks.forEach((shift) => {
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

 */




/* let sticks = [];
for(let i = 0; i < density; i++) {
  let randXrange = Math.floor(Math.random() * windowWidth);
  let randYrange = Math.floor(Math.random() * windowHeight);
  let randAngle  = Math.floor(Math.random() * 360);

  sticks[i] = document.createElement('img');
  sticks[i].src = stickSrc;
  sticks[i].setAttribute('style', `transform: translate(${randXrange}px, ${randYrange}px) rotate(${randAngle}deg);
                                     filter: invert(61%) sepia(46%) saturate(5056%) hue-rotate(2deg) brightness(102%) contrast(101%);`);
  
  plxWrapper.appendChild(sticks[i]);
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
