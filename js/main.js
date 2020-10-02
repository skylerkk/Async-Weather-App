//get variables of all the elemnts
const btn = document.getElementById("btn");
const zipCode = document.getElementById("ZipCode");
const errorMessage = document.getElementById("errorMessage");
const cityName = document.getElementById("cityName");
const temperatureK = document.getElementById("temperatureK");
const temperatureF = document.getElementById("temperatureF");
const temperatureC = document.getElementById("temperatureC");
const condition = document.getElementById("Condition");
const other = document.getElementById("Other");

//string for the weather icon
const iconString = "https://openweathermap.org/img/wn/";

//function to get the zip code then mkae the key
function makeKey(zipCode) {
    return `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=93d8d41cef849260114c31800c573050`;
}


//function to access all the information nad put it where it needs to goes
btn.addEventListener("click", function () {

    //fetch the info with the url made in makeKey
    fetch(makeKey(zipCode.value))

    //make all of that info into json
        .then(response => response.json())

        //using that info populate the page
        .then((data) => {

            console.log(data);
            // Hide the error message
            errorMessage.style.display = "none";

            //change city name, all different temperatures, and condition to the values in the json
            cityName.innerHTML = data.name;
            let temperature = data.main.temp;
            temperatureK.innerHTML = `${Math.floor(temperature)} K`;
            temperatureF.innerHTML = `${Math.floor((temperature * (9 / 5) - 459.67))} F`;
            temperatureC.innerHTML = `${Math.floor(temperature - 273.15)} C`;
            condition.innerHTML = data.weather[0].main;

            //set the img to the icon String + the json for the icon and adding on @4x so the size will be larger
            other.src = `${iconString}${data.weather[0].icon}@4x.png`;
        })
        
        //If any of these statments above throw an error then catch it and show the error message block and throw a general error message
        .catch(error => {
            errorMessage.style.display = "block";
            console.error(error);
            console.log(errorMessage.children);
            errorMessage.children[0].innerHTML = "Error, please check your input and try again.";
        });
});