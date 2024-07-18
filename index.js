function isMobile() {
  // const regex = /iphone|ipod|android|ie|blackberry|fennec/i
  // return regex.test(navigator.userAgent);
  return /Mobi/i.test(window.navigator.userAgent)
}

function getRandomSignedValue(range) {
  const randSign = Math.random() > 0.5 ? 1 : -1;
  const randValue = Math.floor(Math.random() * range);
  return randValue * randSign
}

function getRandomValue(range) {
  return Math.floor(Math.random() * range);
}


const mobile        = isMobile();
const plxWrapper    = document.querySelector('.plx-wrapper');
const density       = 200;
const windowWidth   = window.innerWidth;
const windowHeight  = window.innerHeight;


const stickSrc = './svg/stick_smaller.svg';
const stickColor = `invert(61%) sepia(46%) saturate(5056%) hue-rotate(2deg) brightness(102%) contrast(101%)`;

let sticks = [];
for(let i = 0; i < density; i++) {
  const randAngle  = getRandomValue(360);

  const randPositionTop = getRandomValue(100);
  const randPositionLeft = getRandomValue(100);

  const elemPositionalValue = getRandomSignedValue(30);
  const elemDepthScale      = elemPositionalValue / 10;
  const elemScale           = 2 + elemDepthScale;

  sticks[i] = document.createElement('img');
  sticks[i].src = stickSrc;

  sticks[i].setAttribute('value', `${elemPositionalValue}`);
  sticks[i].style.position  = 'absolute';
  sticks[i].style.top       = `${randPositionTop}%`;
  sticks[i].style.left      = `${randPositionLeft}%`;
  sticks[i].style.transform = `rotate(${randAngle}deg) scale(${elemScale})`;
  sticks[i].style.filter    = `${stickColor}`;
  
  plxWrapper.appendChild(sticks[i]);
}


const out = document.querySelector('.js-out');

const eventListener = mobile ? 'deviceorientation' : 'mousemove';

document.addEventListener(eventListener , (ev) => {
  sticks.forEach((stick) => {
    const position       = stick.getAttribute('value');

    const devicePosXValue = mobile ? ev.gamma : ev.pageX;
    const devicePosYValue = mobile ? ev.beta  : ev.pageY;
    const speedDivisor    = mobile ? 40 : 250;

    out.textContent = `Beta: ${devicePosXValue}, Gamma: ${devicePosYValue}`

    const x = (window.innerWidth - devicePosXValue * position) / speedDivisor;
    const y = (window.innerHeight - devicePosYValue * position) / speedDivisor;

    const elemDepthScale      = position / 10;
    const elemScale           = 2 + elemDepthScale;



    // Shamelessly Stolen from https://stackoverflow.com/questions/59882504/how-to-get-style-transform-rotate-value-in-javascript
    let angle = 0;
    const rotate = stick.style.transform.match(/rotate\((\d+)(.+)\)/);
    if (rotate) {
      let [num, unit] = rotate.slice(1);  // slice is needed since first element contains entire match
      //console.log('num:', num, 'unit:', unit);
      angle = num;
    }

    stick.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${elemScale})`;

  });
});



