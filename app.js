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
                    let fahrenheit = (temperature * (9 / 5) + 32) ;
                    temp.innerHTML = `Current Temp is: ${Math.floor(fahrenheit)}<span>&#176;</span>F`;
                    temperature = 0;
                } else {
                    temperature = data.main.temp
                    temp.innerHTML = `Current Temp is: ${Math.floor(temperature)}<span>&#176;</span>C`;
                }
            })
            console.log(data.weather[0].main)
            const weatherCondition = data.weather[0].main;
            icon.src = `public/image/${weatherCondition}.svg`;
        });
    }
});

const nasaScreen = document.querySelector('#nasa-screen');
const nasaImages = document.querySelector('.nasa-images');
//  On clicking and Entering the NASA screen Button
nasaScreen.addEventListener('click', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    welcomeScreen.classList.add('hidden');
    const mainScreen = document.querySelector('#main-screen');
    mainScreen.classList.remove('hidden');
    const astronomyQuestion = document.querySelector('#astronomy-question');
    astronomyQuestion.classList.remove('hidden');
    const yesButton = document.querySelector('#yes');
    const noButton = document.querySelector('#no');
    const reaction = document.querySelector('.reaction');
    noButton.addEventListener('click', () => {
        reaction.classList.remove('hidden');
        reaction.innerHTML = `<p>If astronomy bores you, let me tell you a joke. Do you know how astronomers party?
        They plan'et. Hahaha... <br> 
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
        const response = await fetch(urlNASA);
        const data = await response.json();
        console.log(data);
        imgNASA.src = data.url;
        explanation.classList.remove('hidden');
        const option = document.querySelector('#option');
        option.addEventListener('click', () => {
            explanationPara.textContent = option.checked ? data.explanation
            : 'Check the box above to learn more about this picture';
        })          
        const databaseButton = document.querySelector('#to-database');
        databaseButton.classList.remove('hidden');
        }, 1500) 
    })
    const databaseButton = document.querySelector('#to-database');
    databaseButton.addEventListener('click', () => {
        dataNASA.classList.add('hidden');
        imgNASA.classList.add('hidden');
        explanation.classList.add('hidden');
        explanationPara.classList.add('hidden');
        databaseButton.classList.add('hidden');
        nasaImages.classList.remove('hidden');
    })    
})

const searchResultsNASA = document.querySelector('#nasa-search-results')
const queryNasa = async () => {
    const searchTerm = document.getElementById("search-input");
    const query = searchTerm.value;
    const baseUrl = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
    const videoOption = document.querySelector('#search-option1');
    let urlNASA = videoOption.checked ? `${baseUrl},video` : baseUrl ;
    const resp = await fetch(urlNASA);
    const data = await resp.json()
    console.log(data);
    searchResultsNASA.textContent = '';
    for (let i = 0; i < 9 ; i++) {
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
    `}
}

const searchButton = document.querySelector('#search-btn');
searchButton.addEventListener('click', queryNasa);
const backHomeButton = document.querySelector('#back-home');
backHomeButton.addEventListener('click', () => {
    nasaImages.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    searchResultsNASA.innerHTML = '';
})




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

else { const locError = document.createElement('div');
    const welcome = document.getElementById('welcome');
    welcome.appendChild(locError);
    locError.textContent = "I can't get your location";

    let lat = 52.377956;
    let lon = 4.897070;
}

// toggle the show explanation button
function toggleHide(className) {
    var element = document.querySelector(className);
    element.classList.toggle("hidden");
}    


*/
