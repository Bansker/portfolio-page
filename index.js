const plxWrapper = document.querySelector('.plx-wrapper');
const out = document.querySelector('.js-out');
const density = 200;

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

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


const mobile = isMobile();


const stickSrc = './svg/stick_smaller.svg';
let sticks = [];
for(let i = 0; i < density; i++) {
  const randAngle  = getRandomValue(360);

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


if(!mobile) {
  document.addEventListener('mousemove', (ev) => {
    sticks.forEach((stick) => {
      const position = stick.getAttribute('value');
      const x = (window.innerWidth - ev.pageX * position) / 250;
      const y = (window.innerHeight - ev.pageY * position) / 250;
  
      // Shamelessly Stolen from https://stackoverflow.com/questions/59882504/how-to-get-style-transform-rotate-value-in-javascript
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

} else {
  window.addEventListener('deviceorientation', (ev) =>{
    sticks.forEach((stick) => {
      const position = stick.getAttribute('value');
      const x = (window.innerWidth - ev.gamma * position) / 40;
      const y = (window.innerHeight - ev.beta * position) / 40;
  
      // Shamelessly Stolen from https://stackoverflow.com/questions/59882504/how-to-get-style-transform-rotate-value-in-javascript
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
}
