window.addEventListener('load', () => {
    const apiKey = '24bb21182ada6dcc2c538be1bb4be546'
    const loc = document.querySelector('#location');
    const temp = document.querySelector('#temperature');
    const description = document.querySelector('#description');
    const icon = document.querySelector('#icon');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            const resp = await fetch(url);
            const data = await resp.json()
            console.log(data)
            loc.textContent = `Showing you the weather for ${data.name}`;
            let temperature = data.main.temp;
            temp.innerHTML = `Current Temp is: ${Math.floor(temperature)}<span>&#176;</span>C`;
            description.textContent = data.weather[0].description;
            temp.addEventListener('click', () => {
                if (temperature === data.main.temp) {
                    fahrenheit = (temperature * (9 / 5) + 32) ;
                    temp.innerHTML = `Current Temp is: ${Math.floor(fahrenheit)}<span>&#176;</span>F`;
                    temperature = 0;
                } else {
                    temperature = data.main.temp
                    temp.innerHTML = `Current Temp is: ${Math.floor(temperature)}<span>&#176;</span>C`;
                }
            })
            console.log(data.weather[0].main)
            const weatherCondition = data.weather[0].main;
            switch (weatherCondition) {
                case 'Clouds':
                    icon.src = './assets/cloudy.svg';
                  break;
                case 'Thunderstorm':
                    icon.src = './assets/thunderstorms.svg';
                  break;
                case 'Drizzle':
                    icon.src = './assets/drizzle.svg';
                  break;
                case 'Rain':
                    icon.src = './assets/rain.svg';
                  break;
                case 'Snow':
                    icon.src = './assets/snow.svg';
                  break;
                case 'Clear':
                    default:
                    icon.src = './assets/clear-day.svg';
                  break;
                }
        });
    }
});












// ! UNUSED
/*

return new Promise((resolve, reject) => {
    if (resp.ok) {
        try {
            resolve(console.log(data));
        } catch (error) {
            reject(error.message)
        }
    }
});

else {
    console.log(123)
    const locError = document.createElement('div');
    const welcome = document.getElementById('welcome');
    welcome.appendChild(locError);
    locError.textContent = "I can't get your location";

    let lat = 52.377956;
    let lon = 4.897070;
}







*/