const out = document.querySelector('.js-out');
out.style.color = 'black';

function isMobile() {
  // const regex = /iphone|ipod|android|ie|blackberry|fennec/i
  // return regex.test(navigator.userAgent);
  return /Mobi/i.test(window.navigator.userAgent)
}

const Parallax = {
  iconElements: [],
  iconStick:      './svg/stick_smaller.svg',

  iconSrc:      ['./svg/nonicons_collection/cat-svgrepo-com.svg',
                  './svg/nonicons_collection/css-16-svgrepo-com.svg',
                  './svg/nonicons_collection/gaming-pad-alt-1-svgrepo-com.svg',
                  './svg/nonicons_collection/html-16-svgrepo-com.svg',
                  './svg/nonicons_collection/javascript-16-svgrepo-com.svg',
                  './svg/nonicons_collection/loading-16-svgrepo-com.svg',
                  './svg/nonicons_collection/prettier-16-svgrepo-com.svg',
                  './svg/nonicons_collection/python-16-svgrepo-com.svg',
                  './svg/nonicons_collection/vscode-16-svgrepo-com.svg'],

  iconColors:   ['invert(40%) sepia(40%) saturate(4258%) hue-rotate(260deg) brightness(86%) contrast(90%)',
                  'invert(22%) sepia(53%) saturate(5062%) hue-rotate(337deg) brightness(109%) contrast(101%)',
                  'invert(80%) sepia(93%) saturate(933%) hue-rotate(78deg) brightness(118%) contrast(92%)',
                  'invert(48%) sepia(40%) saturate(5217%) hue-rotate(226deg) brightness(103%) contrast(102%)',
                  'invert(43%) sepia(93%) saturate(4262%) hue-rotate(356deg) brightness(100%) contrast(96%)',
  ],
  iconDensity:  50,

  computeDepthScale(value, depth=0.01, baseScale=1) {
    return baseScale + value * depth;
  },
};

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


Parallax.iconDensity = mobile ? 30 : 80;
let iconCnt          = 0;
let iconColorCnt     = 0;

for(let i = 0; i < Parallax.iconDensity; i++) {
  const randAngle        = getRandomValue(360);
  const randPositionTop  = getRandomValue(100);
  const randPositionLeft = getRandomValue(100);

  const iconPositionalValue = getRandomSignedValue(30);
  const iconDepthScale      = computeDepthScaleHelper(iconPositionalValue);
  const zIndex = iconPositionalValue - 60;

  Parallax.iconElements[i] = document.createElement('img');
  Parallax.iconElements[i].src = Parallax.iconSrc[iconCnt];
  Parallax.iconElements[i].setAttribute('data-pos-value', `${iconPositionalValue}`);

  Parallax.iconElements[i].style.position  = 'absolute';
  Parallax.iconElements[i].style.top       = `${randPositionTop}%`;
  Parallax.iconElements[i].style.left      = `${randPositionLeft}%`;
  Parallax.iconElements[i].style.transform = `rotate(${randAngle}deg) scale(${iconDepthScale})`;
  Parallax.iconElements[i].style.filter    = `${Parallax.iconColors[iconColorCnt]}`;
  Parallax.iconElements[i].style.zIndex    = `${zIndex}`;
  
  plxWrapper.appendChild(Parallax.iconElements[i]);

  iconCnt++;
  iconColorCnt++;

  if(iconCnt === Parallax.iconSrc.length) iconCnt = 0;
  if(iconColorCnt === Parallax.iconColors.length) iconColorCnt = 0;
}




const eventListener = (mobile) ? 'deviceorientation' : 'mousemove';

window.addEventListener(eventListener, (ev) => {
  Parallax.iconElements.forEach((icon) => {
    const iconPositionalValue        = icon.getAttribute('data-pos-value');
    
    let devicePosXValue; //= (mobile) ? ev.gamma : ev.pageX;
    let devicePosYValue; //= (mobile) ? ev.beta  : ev.pageY;
    let speedDivisor;//  = (mobile) ? 40 : 250;

    // Constrain Sensor values to 180° range to prevent flicks on steep angles
    if(mobile) {
      devicePosXValue = ev.gamma; // degree in the range -90, 90
      devicePosYValue = ev.beta;  // degree in the range -180, 180
      speedDivisor = 40;

      

      if(devicePosXValue > 90)  devicePosXValue = 90; 
      if(devicePosXValue < -90) devicePosXValue = -90;
      if(devicePosYValue > 90)  devicePosYValue = 90;
      if(devicePosYValue < -90) devicePosYValue = -90;

      out.textContent = `Gamma: ${Math.round(devicePosXValue)}, Beta: ${Math.round(devicePosYValue)}`;

    } else {
      devicePosXValue = ev.pageX;
      devicePosYValue = ev.pageY;
      speedDivisor = 250;
    }

    const x = (window.innerWidth  - devicePosXValue * iconPositionalValue) / speedDivisor;
    const y = (window.innerHeight - devicePosYValue * iconPositionalValue) / speedDivisor;

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



