const nasaScreenButton = document.querySelector('#nasa-screen-button');
const nasaImages = document.querySelector('.nasa-images');
const searchResultsNASA = document.querySelector('#nasa-search-results')
const searchButton = document.querySelector('#search-btn');
const backHomeButton = document.querySelector('#back-home');
const loc = document.querySelector('#location');

const welcomeScreen = () => {
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
                console.log('resp:', resp)
                console.log('data:', data);
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
                    icon.src = `public/image/${weatherCondition}.svg`;
                } else if (!resp.ok) {
                    loc.innerHTML = `Couldn't fetch the weather data! <br>
                    ${data.message} `
                    console.log('else if fired')
                }
            } catch (error) {
                loc.innerHTML = `Couldn't fetch the weather data! <br> 
                ${error}`;
                console.log('catch fired')
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

window.addEventListener('load', welcomeScreen);




//  On clicking and Entering the NASA screen Button
nasaScreenButton.addEventListener('click', () => {
    const header = document.getElementById('header');
    const mainScreen = document.querySelector('#main-screen');
    const astronomyQuestion = document.querySelector('#astronomy-question');
    const yesButton = document.querySelector('#yes');
    const noButton = document.querySelector('#no');
    const reaction = document.querySelector('.reaction');
    header.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    astronomyQuestion.classList.remove('hidden');
    noButton.addEventListener('click', () => {
        reaction.classList.remove('hidden');
        reaction.innerHTML = `<p>If astronomy bores you, let me tell you a joke. Do you know how astronomers party?
        They plan'et.<br> 
        Now Click the other button.</p>`
        setTimeout(() => {
            reaction.classList.add('hidden');
            reaction.textContent = '';
        }, 4000)
    })
    const imgNASA = document.querySelector('#apod');
    const dataNASA = document.querySelector('.nasa-data');
    const explanation = document.querySelector('.explanation')
    const explanationPara = document.querySelector('.explanation-p')
    const headingAPOD = document.querySelector('#apod-heading');
    explanation.classList.add('hidden');
    yesButton.addEventListener('click', async () => {
        reaction.classList.remove('hidden');
        reaction.innerHTML = `<p>Let me fetch a cool picture from NASA</p>`;
        setTimeout(async() => {
            reaction.classList.add('hidden');
            reaction.textContent = '';
            astronomyQuestion.classList.add('hidden');
            dataNASA.classList.remove('hidden');
            imgNASA.classList.remove('hidden');
            explanationPara.classList.remove('hidden');
            const apiNASA = 'TlcKEgRGq6uJcfvbGEGveueKIgs7WPsRnRvXvLrw';
            const urlNASA = `https://api.nasa.gov/planetary/apod?api_key=${apiNASA}`
            try {
                const response = await fetch(urlNASA);
                const data = await response.json();
                console.log(response);
                console.log(data);
                if (response.ok) {
                    headingAPOD.textContent = 'Checkout this Incredible Image from NASA';
                    imgNASA.src = data.url;
                    explanation.classList.remove('hidden');
                    const option = document.querySelector('#option');
                    const databaseButton = document.querySelector('#to-database');
                    databaseButton.classList.remove('hidden');
                    option.addEventListener('click', () => {
                        explanationPara.textContent = option.checked ? data.explanation
                        : 'Check the box above to learn more about this picture';
                    })
                }
                else if (!response.ok) {
                    headingAPOD.textContent = data.error.message;
                    console.log('else if:', data.error.message)
                    throw new Error(data);
                }
            } catch (error) {
                console.log('catch error:', error)
                headingAPOD.textContent = error
            }
                      
        }, 1500) 
    })
    const databaseButton = document.querySelector('#to-database');
    databaseButton.addEventListener('click', () => {
        
        headingAPOD.classList.add('hidden');
        dataNASA.classList.add('hidden');
        imgNASA.classList.add('hidden');
        explanation.classList.add('hidden');
        explanationPara.classList.add('hidden');
        databaseButton.classList.add('hidden');
        nasaImages.classList.remove('hidden');
    })    
})

const queryNasa = async () => {
    const searchTerm = document.getElementById("search-input");
    const query = searchTerm.value;
    const baseUrl = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
    const videoOption = document.querySelector('#search-option1');
    let urlNASA = videoOption.checked ? `${baseUrl},video` : baseUrl;
    try {
        const resp = await fetch(urlNASA);
        console.log(resp);
        const data = await resp.json()
        console.log(data);
        if (resp.ok) {
            searchResultsNASA.textContent = '';
            for (let i = 0; i < 9; i++) {
                const imgSrc = data.collection.items[i]['links'][0].href;
                searchResultsNASA.innerHTML += `
                    <article class='cards'>
                    <div>
                    <a href='${imgSrc}' target=”_blank”><img class='imgsNASA' src='${imgSrc}'></a>
                    </div>
                    <div>
                    <h3>${data.collection.items[i]['data'][0].title}</h3>
                    <p>${(data.collection.items[i]['data'][0]['date_created']).slice(0, 10)}</p>
                    <button id='cards${i}'>Get More Details</button>
                    </div>
                    </article>
                `;
            }
        }
    } catch (error) {
        console.log('catch error', error)
    }
}

searchButton.addEventListener('click', queryNasa);
backHomeButton.addEventListener('click', () => {
    nasaImages.classList.add('hidden');
    header.classList.remove('hidden');
    searchResultsNASA.innerHTML = '';
})



