import {Parallax, isMobile, isIOS} from './module/m_parallax.js';

/* const Parallax = {
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

  getRandomValue(range) {
    return Math.floor(Math.random() * range);
  },

  getRandomSignedValue(range) {
    const randSign = Math.random() > 0.5 ? 1 : -1;
    const randValue = Math.floor(Math.random() * range);
    return randValue * randSign
  },

  computeDepthScale(value, depth=0.01, baseScale=1) {
    return baseScale + value * depth;
  },

  computeDepthScaleHelper(value){
    return this.computeDepthScale(value, 0.07, 3);
  },

  initBackground(){
    const plxWrapper    = document.querySelector('.plx-wrapper');
  
    this.iconDensity = mobile ? 30 : 80;
    let iconCnt      = 0;
    let iconColorCnt = 0;
  
    for(let i = 0; i < Parallax.iconDensity; i++) {
      const randAngle        = this.getRandomValue(360);
      const randPositionTop  = this.getRandomValue(100);
      const randPositionLeft = this.getRandomValue(100);
  
      const iconPositionalValue = this.getRandomSignedValue(30);
      const iconDepthScale      = this.computeDepthScaleHelper(iconPositionalValue);
      const zIndex = iconPositionalValue + 30; // shift the icons from range -130.. -70 to -100.. -40
  
      this.iconElements[i] = document.createElement('img');
      this.iconElements[i].src = Parallax.iconSrc[iconCnt];
      this.iconElements[i].setAttribute('data-pos-value', `${iconPositionalValue}`);
  
      this.iconElements[i].style.position       = 'absolute';
      this.iconElements[i].style.top            = `${randPositionTop}%`;
      this.iconElements[i].style.left           = `${randPositionLeft}%`;
      this.iconElements[i].style.transform      = `rotate(${randAngle}deg) scale(${iconDepthScale})`;
      this.iconElements[i].style.filter         = `${this.iconColors[iconColorCnt]}`;
      this.iconElements[i].style.zIndex         = `${zIndex}`;
      this.iconElements[i].style.pointerEvents  = 'none';
      
      plxWrapper.appendChild(Parallax.iconElements[i]);
  
      iconCnt++;
      iconColorCnt++;
  
      if(iconCnt === this.iconSrc.length) iconCnt = 0;
      if(iconColorCnt === this.iconColors.length) iconColorCnt = 0;
    }
  },

}; */



/* function isMobile() {
  // const regex = /iphone|ipod|android|ie|blackberry|fennec/i
  // return regex.test(navigator.userAgent);
  return /Mobi/i.test(window.navigator.userAgent)
} */

/* function isIOS() {
  return /iPad|iPhone|iPod/i.test(window.navigator.userAgent)
} */

function getElementRotation(element) {
  let angle = 0;
  const rotate = element.style.transform.match(/rotate\((\d+)(.+)\)/);

  if (rotate) {
    let [num, unit] = rotate.slice(1);  // slice is needed since first element contains entire match
    //console.log('num:', num, 'unit:', unit);
    angle = num;
  }

  return angle;
}


function handleOrientation(event) {
  Parallax.iconElements.forEach((icon) => {
    const iconPositionalValue = icon.getAttribute('data-pos-value');
    
    let deviceOrientationX = event.gamma; // degree in the range -90, 90
    let deviceOrientationY = event.beta;  // degree in the range -180, 180
    let speedDivisor       = 40;

    // Constrain Sensor values to 180° range to prevent flicks on steep angles
    if(event.gamma > 89)  deviceOrientationX = 89; 
    if(event.gamma < -89) deviceOrientationX = -89;
    if(event.beta > 89)  deviceOrientationY = 89;
    if(event.beta < -89) deviceOrientationY = -89;

    
    const x = (window.innerWidth  - deviceOrientationX * iconPositionalValue) / speedDivisor;
    const y = (window.innerHeight - deviceOrientationY * iconPositionalValue) / speedDivisor;
    
    const elemScale = Parallax.computeDepthScaleHelper(iconPositionalValue)
    const angle     = getElementRotation(icon);
    
    icon.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${elemScale})`;
  });
}


function handleMousePos(event) {
  Parallax.iconElements.forEach((icon) => {
    const iconPositionalValue = icon.getAttribute('data-pos-value');
    
    let mousePosXValue = event.pageX;
    let mousePosYValue = event.pageY;
    let speedDivisor   = 250;

    const x = (window.innerWidth  - mousePosXValue * iconPositionalValue) / speedDivisor;
    const y = (window.innerHeight - mousePosYValue * iconPositionalValue) / speedDivisor;

    const elemScale = Parallax.computeDepthScaleHelper(iconPositionalValue)
    const angle     = getElementRotation(icon)

    icon.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${elemScale})`;
  });
}


const mobile = isMobile();
const ios    = isIOS();

Parallax.initBackground();

if(mobile) {
  if(ios) {
    const permissionDialog = document.querySelector('.modal-ios-permission');
    const permissionBtn    = document.querySelector('.modal-permission-btn');

    permissionDialog.style.display = 'block'; // Show the permission dialog

    permissionBtn.addEventListener('click', () => {
      permissionDialog.style.display = 'none'; // hide permission dialog after button press

      // Handle permission for iOS 13+ devices
      if(typeof DeviceMotionEvent.requestPermission === 'function') {

        DeviceMotionEvent.requestPermission()
          .then((permissionState) => {
            if(permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);

            } else {
              console.error('Request to access the orientation was rejected');
            }
          }).catch(console.error);
          
      } else { // Handle lower iOS versions
        window.addEventListener('deviceorientation', handleOrientation);
      }
    });

  } else { // Handle any other mobile device
    window.addEventListener('deviceorientation', handleOrientation);
  }

} else { // Handle Desktop parallax movement with cursor
  window.addEventListener('mousemove', handleMousePos);
}



