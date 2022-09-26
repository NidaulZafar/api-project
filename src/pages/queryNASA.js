import { searchResultsNASA } from "../../app.js";
import { searchResults } from "../views/nasa-query-view.js";

export const queryNasa = async () => {
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
            if (data.collection.items.length === 0) {
                searchResultsNASA.innerHTML = `<h1>Your search term didn't return anything from the database. Try something astronomical.<h1>`;
            } else if (data.collection.items.length < 9) {
                searchResultsNASA.innerHTML = `<h2>For your query we found ${data.collection.items.length} result(s).</h2>`
                for (let i = 0; i < data.collection.items.length; i++) {
                    const imgSrc = data.collection.items[i]['links'][0].href;
                    searchResultsNASA.innerHTML += searchResults(imgSrc, data.collection.items[i]['data'][0].title, data.collection.items[i]['data'][0]['date_created'], i);
                }
            } else {
                searchResultsNASA.innerHTML = `<h2>For your query we found ${data.collection.items.length} results.
                Here are the first 9 of them.</h2>`
                for (let i = 0; i < 9; i++) {
                    const imgSrc = data.collection.items[i]['links'][0].href;
                    searchResultsNASA.innerHTML += searchResults(imgSrc, data.collection.items[i]['data'][0].title, data.collection.items[i]['data'][0]['date_created'], i);
                }
            }           
        }
    } catch (error) {
        searchResultsNASA.innerHTML = `<h2>${error}. Make sure the url is valid.</h2>`;
    }
}