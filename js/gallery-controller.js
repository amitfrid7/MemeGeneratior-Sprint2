'use strict'

function renderGallery() {
    const imgs = gImgs

    var srtHtmls = imgs.map(img => `
    <img src="img/${img.id}.jpg" onclick="onImgSelect(${img.id})">
    `)

    document.querySelector('.gallery').innerHTML = srtHtmls.join('')
}

function onImgSelect(id) {
    imgSelect(id)
    renderMeme()
}