import {Parallax, isMobile, isIOS} from './module/m_parallax.js';


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

    let deviceOrientationX = 0; // degree in the range -90, 90
    let deviceOrientationY = 0;  // degree in the range -180, 180
    let speedDivisor       = 40;

    if(window.scrollY < 10) {
      deviceOrientationX = event.gamma; // degree in the range -90, 90
      deviceOrientationY = event.beta;  // degree in the range -180, 180
    }

    // Constrain Sensor values to 180° range to prevent flicks on steep angles
    if(event.gamma > 89)  deviceOrientationX = 89; 
    if(event.gamma < -89) deviceOrientationX = -89;
    if(event.beta > 89)  deviceOrientationY = 89;
    if(event.beta < -89) deviceOrientationY = -89;
    
    const x = (window.innerWidth  - deviceOrientationX * iconPositionalValue) / speedDivisor;
    const y = (window.innerHeight - deviceOrientationY * iconPositionalValue) / speedDivisor;
    
    const elemScale = Parallax.computeDepthScaleHelper(iconPositionalValue)
    const angle     = getElementRotation(icon);
    
    console.log(window.scrollY);
    if(window.scrollY < 10) {
      icon.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${elemScale})`;
    }
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


const btnMore = document.querySelector(".js-btn-more");
const btnCV   = document.querySelector(".js-btn-cv");



btnMore.addEventListener('click', () => {
  window.location.href='#welcome';
});

btnCV.addEventListener('click', () => {
  window.location.href='#cv';
});