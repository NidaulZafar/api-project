import { welcomeScreen } from "./welcomePage.js";
import { pictureNASA } from "./APODpage.js";
import { queryNasa } from "./queryNASA.js";
import { main } from "./APODpage.js";


export const nasaImages = document.querySelector('.nasa-images');
export const searchResultsNASA = document.querySelector('#nasa-search-results')
export const loc = document.querySelector('#location');
const nasaScreenButton = document.querySelector('#nasa-screen-button');
const searchButton = document.querySelector('#search-btn');
const backHomeButton = document.querySelector('#back-home');


window.addEventListener('load', welcomeScreen);

//  On clicking and Entering the NASA screen Button
nasaScreenButton.addEventListener('click', pictureNASA)


searchButton.addEventListener('click', queryNasa);
backHomeButton.addEventListener('click', () => {
    nasaImages.classList.add('hidden');
    header.classList.remove('hidden');
    searchResultsNASA.innerHTML = '';
    main.classList.add('hidden');
})