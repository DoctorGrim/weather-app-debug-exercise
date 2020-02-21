/* - - - Events - - - */

async function submitZipCode(event) {
    event.preventDefault();
    // Get Elements
    const zip = document.getElementById("zip-code-input");
    //Ask user for Zip code
    if (zip.value == "") {
        alert("Please enter zip code")
    }else{
    const code = document.getElementById("countries-data").value;
    // Gather Data
    const coordinates = await getWeatherCoordByZip(zip.value, code);
    const longitude = coordinates.lon;
    const latitude = coordinates.lat;
    const units = getSelectedUnitText();
    // Get Weather
    const data = await getWeatherByCoordinate(latitude, longitude, units);
    // Clear Zip Code Value
    zip.value = "";
    // Show Weather
    updateWeatherDisplay(data);
    }
}

function onSettingChanged() {
    // Get Weather Element
    const weatherDisplay = document.getElementById("weather");
    // Hide Weather Display
    weatherDisplay.style.display = "none";
}

/* - - - UI Manipulation - - - */

async function updateCountryList() {
    // Get List Element
    const list = document.getElementById("countries-data");
    // Clear List
    const range = document.createRange();
    range.selectNodeContents(list);
    range.deleteContents();
    // Gather Country Data
    const countries = await getCountryCodes();
    // Add Countries to List
    countries.forEach(function(country, index){
        // Create a new Option Element
        const optionElement = document.createElement("OPTION");
        // Create a new Text Node with Country Name
        const textNode = document.createTextNode(country.name);
        // Set Country Code as the value
        optionElement.value = country.code;
        // Set Country Name as the text
        optionElement.appendChild(textNode);
        // Add Option to List
        list.appendChild(optionElement);
        // Set United States as default country
        list.selectedIndex = (country.code === "US") ? index : list.selectedIndex;
    });
}

function updateWeatherDisplay(data) {
    // Get Elements
    const weatherDisplay = document.getElementById("weather");
    const title = document.getElementById("weather-title");
    const img = document.getElementById("weather-img");
    const temp = document.getElementById("weather-temp");
    const unit = document.getElementById("weather-unit");
    const desc = document.getElementById("weather-desc");
    const unitSetting = document.getElementById("units");
    // Get Values from Data
    const titleVal = data.name;
    const icon = data.weather[0].icon;
    const tempVal = data.main.temp;
    const unitVal = unitSetting.value;
    const descVal = data.weather[0].main;
    // Set Values
    title.innerText = titleVal;
    img.src = "http://openweathermap.org/img/w/"+icon+".png";
    temp.innerText = tempVal;
    unit.innerText = unitVal;
    desc.innerText = descVal;
    // Show Weather Display
    weatherDisplay.style.display = "block";
}

/* - - - Helper Functions - - - */

function getSelectedUnitText() {
    // Find Unit Options
    const unitList = document.getElementById("units");
    // Get Selected Option
    const unitIndex = unitList.selectedIndex;
    // Return Unit Text
    return unitList.options[unitIndex].text;
}