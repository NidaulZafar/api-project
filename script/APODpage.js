import { nasaImages } from "./app.js";
export const main = document.querySelector('main');


export const pictureNASA = () => {
    const header = document.getElementById('header');
    const mainScreen = document.querySelector('#main-screen');
    const astronomyQuestion = document.querySelector('#astronomy-question');
    const yesButton = document.querySelector('#yes');
    const noButton = document.querySelector('#no');
    const reaction = document.querySelector('.reaction');
    header.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    main.classList.remove('hidden');
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
        headingAPOD.innerHTML = ''
        reaction.classList.remove('hidden');
        reaction.innerHTML = `<p>Let me fetch a cool picture from NASA</p>`;
        setTimeout(async () => {
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
                if (response.ok) {
                    if (data['media_type'] === 'video') {
                        headingAPOD.classList.remove('hidden');
                        headingAPOD.innerHTML = `Mostly its an image and rarely a video. Today is one of those rare days.
                        <a href="${data.url}">Click here</a> to watch the video on Youtube.`
                        databaseButton.classList.remove('hidden');
                    } else {                        
                        headingAPOD.innerHTML = 'Checkout this Incredible Image from NASA';
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
                }
                else {
                    console.log('else fired');
                    headingAPOD.innerHTML = `Something went wrong!<br>
                    ${data.error.message}`;
                }
            } catch (error) {
                console.log('catch error:', error)
                headingAPOD.innerHTML = `There was an error. ${error.message}`;
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
};