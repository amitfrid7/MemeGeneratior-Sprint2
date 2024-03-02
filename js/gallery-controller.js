'use strict'

function renderGallery() {
    const imgs = gImgs

    var srtHtmls = imgs.map(img => `
    <img src="img/meme-imgs (square)/${img.id}.jpg" onclick="onImgSelect(${img.id})">
    `)

    document.querySelector('.gallery').innerHTML = srtHtmls.join('')
}

function onImgSelect(id) {
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hidden')
    imgSelect(id)
    renderMeme()
}