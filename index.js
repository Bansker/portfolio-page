const out = document.querySelector('.js-out');

function isMobile() {
  // const regex = /iphone|ipod|android|ie|blackberry|fennec/i
  // return regex.test(navigator.userAgent);
  return /Mobi/i.test(window.navigator.userAgent)
}

const Parallax = {
  iconElements: [],
  iconStick:      './svg/stick_smaller.svg',
  iconSrc:     ['./svg/nonicons_collection/cat-svgrepo-com.svg',
                  './svg/nonicons_collection/css-16-svgrepo-com.svg',
                  './svg/nonicons_collection/gaming-pad-alt-1-svgrepo-com.svg',
                  './svg/nonicons_collection/html-16-svgrepo-com.svg',
                  './svg/nonicons_collection/javascript-16-svgrepo-com.svg',
                  './svg/nonicons_collection/loading-16-svgrepo-com.svg',
                  './svg/nonicons_collection/prettier-16-svgrepo-com.svg',
                  './svg/nonicons_collection/python-16-svgrepo-com.svg',
                  './svg/nonicons_collection/vscode-16-svgrepo-com.svg'],
  iconColor:    `invert(61%) sepia(46%) saturate(5056%) hue-rotate(2deg) brightness(102%) contrast(101%)`,
  iconDensity:  50,

  computeDepthScale(value, depth=0.01, baseScale=1) {
    return baseScale + value * depth;
  },
};

// sacale 0.079623
//breit 1.053
//hohe 10.053


function getRandomSignedValue(range) {
  const randSign = Math.random() > 0.5 ? 1 : -1;
  const randValue = Math.floor(Math.random() * range);
  return randValue * randSign
}

function getRandomValue(range) {
  return Math.floor(Math.random() * range);
}

function computeDepthScaleHelper(value){
  return Parallax.computeDepthScale(value, 0.07, 3);
}



const mobile        = isMobile();
const plxWrapper    = document.querySelector('.plx-wrapper');

const windowWidth   = window.innerWidth;
const windowHeight  = window.innerHeight;


Parallax.iconDensity       = mobile ? 25 : 75;
let iconCnt = 0;
for(let i = 0; i < Parallax.iconDensity; i++) {
  const randAngle        = getRandomValue(360);
  const randPositionTop  = getRandomValue(100);
  const randPositionLeft = getRandomValue(100);

  const iconPositionalValue = getRandomSignedValue(30);
  const iconDepthScale      = computeDepthScaleHelper(iconPositionalValue);

  Parallax.iconElements[i] = document.createElement('img');
  Parallax.iconElements[i].src = Parallax.iconSrc[iconCnt];

  Parallax.iconElements[i].setAttribute('data-pos-value', `${iconPositionalValue}`);
  Parallax.iconElements[i].style.position  = 'absolute';
  Parallax.iconElements[i].style.top       = `${randPositionTop}%`;
  Parallax.iconElements[i].style.left      = `${randPositionLeft}%`;
  Parallax.iconElements[i].style.transform = `rotate(${randAngle}deg) scale(${iconDepthScale})`;
  Parallax.iconElements[i].style.filter    = `${Parallax.iconColor}`;
  
  plxWrapper.appendChild(Parallax.iconElements[i]);

  
  iconCnt++;
  if(iconCnt === Parallax.iconSrc.length) {
    iconCnt = 0;
  }
}




const eventListener = (mobile) ? 'deviceorientation' : 'mousemove';

window.addEventListener(eventListener, (ev) => {
  Parallax.iconElements.forEach((icon) => {
    const iconPositionalValue        = icon.getAttribute('data-pos-value');
    
    const devicePosXValue = (mobile) ? ev.gamma : ev.pageX;
    const devicePosYValue = (mobile) ? ev.beta  : ev.pageY;
    const speedDivisor    = (mobile) ? 40 : 250;

    const x = (window.innerWidth  - devicePosXValue * iconPositionalValue) / speedDivisor;
    const y = (window.innerHeight - devicePosYValue * iconPositionalValue) / speedDivisor;

    const iconDepthScale      = iconPositionalValue / 10;
    const elemScale           = computeDepthScaleHelper(iconPositionalValue)

    // Shamelessly Stolen from https://stackoverflow.com/questions/59882504/how-to-get-style-transform-rotate-value-in-javascript
    let angle = 0;
    const rotate = icon.style.transform.match(/rotate\((\d+)(.+)\)/);
    if (rotate) {
      let [num, unit] = rotate.slice(1);  // slice is needed since first element contains entire match
      //console.log('num:', num, 'unit:', unit);
      angle = num;
    }

    icon.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${elemScale})`;

  });
});



