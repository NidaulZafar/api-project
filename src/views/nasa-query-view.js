export const searchResults = (img, dataTitle, date, i) => {
    return `
    <article class='cards'>
    <div>
    <a href='${img}' target=”_blank”><img class='imgsNASA' src='${img}'></a>
    </div>
    <div>
    <h3>${dataTitle}</h3>
    <p>${(date).slice(0, 10)}</p>
    <button id='cards${i}'>Get More Details</button>
    </div>
    </article>
`
}