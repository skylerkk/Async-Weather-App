//get variables
const btn = document.getElementById("btn");
const zipCode = document.getElementById("ZipCode");
const errorMessage = document.getElementById("errorMessage");
const cityName = document.getElementById("cityName");
const temperatureK = document.getElementById("temperatureK");
const temperatureF = document.getElementById("temperatureF");
const temperatureC = document.getElementById("temperatureC");
const condition = document.getElementById("Condition");
const other = document.getElementById("Other");

const iconString = "https://openweathermap.org/img/wn/";

//function to get the zip code then mkae the key
function makeKey(zipCode) {
    return `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=93d8d41cef849260114c31800c573050`;
}


//function to access all the information nad put it where it needs to goes
btn.addEventListener("click", function () {
    fetch(makeKey(zipCode.value))
        .then(response => response.json())
        .then((data) => {
            console.log(data.weather[0].icon);
            errorMessage.style.display = "none";
            cityName.innerHTML = data.name;
            let temperature = data.main.temp;
            temperatureK.innerHTML = `${Math.floor(temperature)} K`;
            temperatureF.innerHTML = `${Math.floor((temperature * (9 / 5) - 459.67))} F`;
            temperatureC.innerHTML = `${Math.floor(temperature - 273.15)} C`;
            condition.innerHTML = data.weather[0].main;
            other.src = `${iconString}${data.weather[0].icon}@4x.png`;
        }).catch(error => {
            errorMessage.style.display = "block";
            errorMessage.children[0].innerHTML = "Error, please check your input and try again.";
        });
});