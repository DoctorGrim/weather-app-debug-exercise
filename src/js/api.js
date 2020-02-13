// Open Weather API

const apiKey = "86db9c6e11a095c9ca880edde481a750";

function getWeatherCoordByZip(zip, countryCode) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                const result = JSON.parse(this.responseText);
                resolve(result.coord);
            }
        });
        xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + countryCode + "&appid=" + apiKey);
        xhr.send();
    });
}

function getWeatherByCoordinate(lat, lon, units) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                const result = JSON.parse(this.responseText);
                console.log(result);
                resolve(result);
            }
        });
        xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units="+units+"&appid="+apiKey);
        xhr.send();
    });
}

// Country Codes API

function getCountryCodes() {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let collectedData = [];
                const result = JSON.parse(this.responseText);
                result.forEach(function(country){
                    collectedData.push({"name": country.name, "code": country.alpha2Code})
                });
                resolve(collectedData);
            }
        });
        xhr.open("GET", "https://restcountries.eu/rest/v2/all");
        xhr.send();
    });
}