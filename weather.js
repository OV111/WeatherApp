const apiKey = "b993fd7f15a8ad0b1dd5c3dc9ddf3f52";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.getElementById("get-weather-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {

        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    
        if(data.weather[0].main == 'Clear'){
            weatherIcon.src = "images/sun.png"
        } else if(data.weather[0].main == 'Rain') {
            weatherIcon.src = "images/Rainy Weather.png"
        } else if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/Cloudy Weather (2).png"
        } else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/Mist weather.png"
        } else if(data.weather[0].main == "Smoke") {
            weatherIcon.src = "images/storm.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        
    }
}
checkWeather("new york")
searchBox.addEventListener('keydown',function(e)   {
    if(e.key === "Enter") {
        checkWeather(searchBox.value);
    }
    
});
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
