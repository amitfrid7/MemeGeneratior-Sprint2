'use strict'

function renderGallery() {
    const imgs = gImgs

    var srtHtmls = imgs.map(img => `
    <img src="img/${img.id}.jpg" onclick="onChooseImg(${img.id})">
    `)

    document.querySelector('.gallery').innerHTML = srtHtmls.join('')
}

function onChooseImg(id) {
    const img = getImgById(id)
    gMeme.selectedImgId = img.id
    renderMeme()
}