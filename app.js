
const iconElement = document.querySelector(".weather-icon"),
    tempElement = document.querySelector(".temp-value p"),
    timeElement = document.querySelector(".date p"),
    descElement = document.querySelector(".temp-description p"),
    locationElement = document.querySelector(".location p"),
    notificationElement = document.querySelector(".notification"),
    minTempElement = document.querySelector(".temp-min"),
    maxTempElement = document.querySelector(".temp-max"),
    videoElement = document.querySelector("#myVideo"),
    player = document.querySelector('.fake-player'),
    buttonPlay = document.getElementsByTagName("button")[0],
    buttonPause = document.getElementsByTagName("button")[1];

const weather = {};

const key = "1143b8b0f3c94acdbae282bec3b5b65a";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    getDateTime();
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}


async function getWeather(latitude, longitude){
    try {
        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        weather.temperature = Math.floor(data.main.temp);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.min = Math.floor(data.main.temp_min);
        weather.max = Math.floor(data.main.temp_max);
        (function display(){
            iconElement.innerHTML = ` <img src="icons/${weather.iconId}.png"/>`;
            tempElement.innerHTML = `${weather.temperature}°<span>C</span>`;
            descElement.innerHTML = weather.description;
            locationElement.innerHTML = `${weather.city}, ${weather.country}`;
            minTempElement.innerHTML = `${weather.min}°C`;
            maxTempElement.innerHTML = `${weather.max}°C`;
            videoElement.innerHTML =`<source src="video/${weather.iconId}.mp4" type="video/mp4"></source>`;
      })()} catch (error) {
        console.error(error);
      }
    }
   
function getDateTime() {
    let date = new Date(),
    hour = date.getHours(),
    minute = date.getMinutes();


    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
 
    if (minute < 10) {
        minute = "0" + minute;
    }
    let weekDay = days[date.getDay()];
    timeElement.textContent = `${weekDay}, ${hour}:${minute}`;
}



function playVid() { 
    videoElement.play(); 
} 

function pauseVid() { 
    videoElement.pause(); 
} 

function clickHandler () { 
    const buttons = Array.from(this.children);
    buttons.forEach(button => button.classList.toggle('hidden'));

};

player.addEventListener('click', clickHandler);
buttonPlay.addEventListener('click', playVid);
buttonPause.addEventListener('click', pauseVid);
