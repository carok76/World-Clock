let currentCityInterval;

function updateTime() {
// Los Angeles
let losAngelesElement = document.querySelector("#los-angeles");
if (losAngelesElement) {
let losAngelesDateElement = losAngelesElement.querySelector(".date");
let losAngelesTimeElement = losAngelesElement.querySelector(".time");
let losAngelesTime = moment().tz("America/Los_Angeles");

losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM Do YYYY"); 
losAngelesTimeElement.innerHTML = losAngelesTime.format("h:mm:ss [<small>]A[</small>]");
}

// Berlin
let berlinElement = document.querySelector("#berlin");
if (berlinElement) {
let berlinDateElement = berlinElement.querySelector(".date");
let berlinTimeElement = berlinElement.querySelector(".time");
let berlinTime = moment().tz("Europe/Berlin");

berlinDateElement.innerHTML = berlinTime.format("MMMM Do YYYY");
berlinTimeElement.innerHTML = berlinTime.format("h:mm:ss [<small>]A[</small>]");
}
}

function updateCity(event) {
    let cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess();
    }
    let cityTime = moment().tz(cityTimeZone);
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let citiesElement = document.querySelector("#city");
    citiesElement.innerHTML = `
            <div class="city">
            <div>
                <h2>${cityName}</h2>
                <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time">${cityTime.format("h:mm:ss [<small>]A[</small>]")}</div>
        </div>`;

    if (currentCityInterval) {
        clearInterval(currentCityInterval);
    }

    currentCityInterval = setInterval(() => {
        let updatedTime = moment().tz(cityTimeZone);
        let cityElement = document.querySelector("#city .city");
        let dateElement = cityElement.querySelector(".date");
        let timeElement = cityElement.querySelector(".time");

        dateElement.innerHTML = updatedTime.format("MMMM Do YYYY");
        timeElement.innerHTML = updatedTime.format("h:mm:ss [<small>]A[</small>]");
    }, 1000);
}

updateTime();
setInterval(updateTime, 1000);

let citiesSelectElement = document.querySelector("#cities");
citiesSelectElement.addEventListener("change", updateCity);