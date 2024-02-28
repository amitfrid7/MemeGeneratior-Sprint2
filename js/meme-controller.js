'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    window.addEventListener('resize', () => resizeCanvas())
    renderMeme()
    renderGallery()
}

function renderMeme() {
    const meme = gMeme
    const memeImg = getImgById(meme.selectedImgId)
    const lineIdx = meme.selectedLineIdx
    const img = new Image()
    img.src = memeImg.url
    
    gCtx.fillStyle = meme.lines[lineIdx].color
    gCtx.font = "bold 24px Arial"
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.width, img.height)
        gCtx.fillText(meme.lines[meme.selectedLineIdx].txt, 100, 100)
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    
    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}