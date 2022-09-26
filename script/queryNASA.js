import { searchResultsNASA } from "./app.js";
import { searchResults } from "./views/nasa-query-view.js";
import { requestData } from "./fetch.js";


export const queryNasa = async () => {
    const searchTerm = document.getElementById("search-input");
    const query = searchTerm.value;
    const baseUrl = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
    const videoOption = document.querySelector('#search-option1');
    let urlNASA = videoOption.checked ? `${baseUrl},video` : baseUrl;
    try {
        const data = await requestData(urlNASA);
        searchResultsNASA.textContent = '';
        if (data.collection.items.length === 0) {
            searchResultsNASA.innerHTML = `<h1>Your search term didn't return anything from the database. Try something astronomical.<h1>`;
        } else if (data.collection.items.length < 9) {
            renderImages(searchResultsNASA, data)
        } else {
            renderImages(searchResultsNASA, data, 9)
        }           
        
    } catch (error) {
        searchResultsNASA.innerHTML = `<h2>${error}. Make sure the url is valid.</h2>`;
    }
}

function renderImages(searchResultsNASA, data, limit) {
    const extraMessage = limit ? `Here are the first ${limit} of them.` : '';
    const loopCount = limit ? limit : data.collection.items.length;
    searchResultsNASA.innerHTML = `<h2>For your query we found ${data.collection.items.length} result(s).${extraMessage}</h2>`
    for (let i = 0; i < loopCount; i++) {
        const imgSrc = data.collection.items[i]['links'][0].href;
        searchResultsNASA.innerHTML += searchResults(imgSrc, data.collection.items[i]['data'][0].title, data.collection.items[i]['data'][0]['date_created'], i);
    }
}



  