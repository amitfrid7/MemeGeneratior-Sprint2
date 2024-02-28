'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
    renderGallery()
}

function renderMeme() {
    const meme = getMeme()
    const memeImg = getImgById(meme.selectedImgId)
    const lineIdx = meme.selectedLineIdx
    const img = new Image()
    img.src = memeImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.width, img.height)
        if (meme.lines.length) {
            const lines = meme.lines
            lines.forEach ((line) => {
                gCtx.fillStyle = line.color,
                gCtx.font = `bold ${line.size}px Arial`,
                gCtx.fillText(line.txt, 200, 100)

            }
        )}
    }
    console.log('gMeme:', gMeme)
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}