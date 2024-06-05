
/* Clock and Time */
setInterval(() => {
  let hours   = document.getElementById("hours");
  let minutes	= document.getElementById("minutes");
  let seconds = document.getElementById("seconds");
  let msg     = document.getElementById("message");

  let currentHour  	= new Date().getHours();
  let currentMinute = new Date().getMinutes();
  let currentSecond	= new Date().getSeconds();
  let currentPhase  = "Phase of Day";
  let h             = currentHour;

  switch(true) {
    case 3 < h && h < 11:
      currentPhase = "Guten Morgen";
      break;

    case 10 < h && h < 13:
      currentPhase = "En Guete!";
      break;

    case 12 < h && h < 17:
      currentPhase = "Guten Nachmittag";
      break;

    case 16 < h && h < 22:
      currentPhase = "Guten Abend";
      break;
    
    default:
    	currentPhase = "Gute Nacht";
  }

  currentHour		= currentHour   < 10 ? "0" + currentHour  	: currentHour;
  currentMinute	= currentMinute < 10 ? "0" + currentMinute	: currentMinute;
  currentSecond	= currentSecond < 10 ? "0" + currentSecond	: currentSecond;

  hours.innerHTML   = currentHour;
  minutes.innerHTML = currentMinute;
  seconds.innerHTML = currentSecond;
  msg.innerHTML     = currentPhase;
}, 1000);


/* Weather Data */
const apiKey = "33f0702e3862c027c08f73cfdd4a0e0a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput 	= document.getElementById("locationInput");
const searchBtn				= document.getElementById("searchBtn");
const locationElem		= document.getElementById("location");
const temperatureElem	= document.getElementById("temperature");
const descriptionElem	= document.getElementById("description");

searchBtn.addEventListener('click', () => {
	const location = locationInput.value;
	if(location) {
		fetchWeather(location);
	}
});

function fetchWeather(location) {
	const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric&lang=de`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			locationElem.innerHTML 		  = `Ort: ${data.name}`;
			temperatureElem.textContent = `${Math.round(data.main.temp)}°C`;
			descriptionElem.textContent = data.weather[0].description;
		})
		.catch(error => {
			console.error('Error fetching weather data:', error);
		})
}







