import { loc } from "./app.js";

export const welcomeScreen = () => {
    const apiKey = '24bb21182ada6dcc2c538be1bb4be546'
    const temp = document.querySelector('#temperature');
    const description = document.querySelector('#description');
    const icon = document.querySelector('#icon');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            try {
                const resp = await fetch(url);
                const data = await resp.json()
                if (resp.ok) {
                    loc.textContent = `Showing you the weather for ${data.name}`;
                    let temperature = data.main.temp;
                    temp.innerHTML = `Current Temp is: ${Math.floor(temperature)}<span>&#176;</span>C`;
                    description.textContent = data.weather[0].description;
                    temp.addEventListener('click', () => {
                        if (temperature === data.main.temp) {
                            let fahrenheit = (temperature * (9 / 5) + 32);
                            temp.innerHTML = `Current Temp is: ${Math.floor(fahrenheit)}<span>&#176;</span>F`;
                            temperature = 0;
                        } else {
                            temperature = data.main.temp
                            temp.innerHTML = `Current Temp is: ${Math.floor(temperature)}<span>&#176;</span>C`;
                        }
                    })
                    const weatherCondition = data.weather[0].main;
                    icon.src = `../images/${weatherCondition}.svg`;
                } else {
                    loc.innerHTML = `Couldn't fetch the weather data! <br>
                    ${data.message}`
                }
            } catch (error) {
                loc.innerHTML = `Couldn't fetch the weather data! <br> 
                ${error}`;
            }
        }, showLocationError, {timeout: 5000});
    }
}

function showLocationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            loc.innerHTML = `Why on Earth did you deny the location? &#128543<br>
            I wanted to show you something cool`;
        break;
        case error.POSITION_UNAVAILABLE:
            loc.innerHTML = "Location information is unavailable."
        break;
        case error.TIMEOUT:
            loc.innerHTML = "The request to get user location timed out."
        break;
        default:
            loc.innerHTML = "An unknown error occurred."
        break;
    }
}