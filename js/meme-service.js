'use strict'

let gStartPos
let gChosenLine
const STORAGE_KEY = 'memeDB'
const SAVED_KEY = 'savedDB'

var gSavedMemes = []

var gImgs = [
    { id: 1, url: './img/meme-imgs (square)/1.jpg' },
    { id: 2, url: 'img/meme-imgs (square)/2.jpg' },
    { id: 3, url: 'img/meme-imgs (square)/3.jpg' },
    { id: 4, url: 'img/meme-imgs (square)/4.jpg' },
    { id: 5, url: 'img/meme-imgs (square)/5.jpg' },
    { id: 6, url: 'img/meme-imgs (square)/6.jpg' },
    { id: 7, url: 'img/meme-imgs (square)/7.jpg' },
    { id: 8, url: 'img/meme-imgs (square)/8.jpg' },
    { id: 9, url: 'img/meme-imgs (square)/9.jpg' },
    { id: 10, url: 'img/meme-imgs (square)/10.jpg' },
    { id: 11, url: 'img/meme-imgs (square)/11.jpg' },
    { id: 12, url: 'img/meme-imgs (square)/12.jpg' },
    { id: 13, url: 'img/meme-imgs (square)/13.jpg' },
    { id: 14, url: 'img/meme-imgs (square)/14.jpg' },
    { id: 15, url: 'img/meme-imgs (square)/15.jpg' },
    { id: 16, url: 'img/meme-imgs (square)/16.jpg' },
    { id: 17, url: 'img/meme-imgs (square)/17.jpg' },
    { id: 18, url: 'img/meme-imgs (square)/18.jpg' },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [],
    id: makeId()
}

function getMeme() {
    gMeme = loadFromStorage(STORAGE_KEY)
    if (!gMeme) gMeme = createMeme()
    return gMeme
}

function createMeme() {
    return {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [],
        id: makeId()
    }
}

function setLineTxt(txt) {
    const lineIdx = gMeme.selectedLineIdx
    var txtInput = document.querySelector('.text-input')

    if (!gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
        addLine()
    }

    gMeme.lines[lineIdx].txt = txt
    txtInput = txt

    _saveMemeToStorage()
}

function getImgById(id) {
    return gImgs.find(img => id === img.id)
}

function increaseFont() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size += 2
    _saveMemeToStorage()
}

function decreaseFont() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size -= 2
    _saveMemeToStorage()
}

function addLine(pos = { x: 200, y: 100 }) {
    gMeme.lines.push(
        {
            txt: 'New line',
            size: 24,
            color: '#ffffff',
            pos,
            isDrag: false
        })
    saveToStorage(STORAGE_KEY, gMeme)
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function deleteLine() {
    gMeme.selectedLineIdx = 0
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)

    clearPlaceHolders()
    saveToStorage(STORAGE_KEY, gMeme)
}

function saveMeme() {
    gSavedMemes.push(gMeme)
    saveToStorage(SAVED_KEY, gSavedMemes)
}

function clearSavedMemes() {
    gSavedMemes.splice(0)
    saveToStorage(SAVED_KEY, gSavedMemes)
}

function clearPlaceHolders() {
    let txtInput = document.querySelector('.text-input')
    let colorInput = document.querySelector('.text-color')

    txtInput.placeholder = ''
    colorInput.value = 'black'
}

function setColor(color) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].color = color
    _saveMemeToStorage()
}

function imgSelect(id) {
    const img = getImgById(id)
    gMeme.selectedImgId = img.id
    _saveMemeToStorage()
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function getLine() {
    const lineIdx = gMeme.selectedLineIdx
    if (!gMeme.lines.length) return
    return gMeme.lines[lineIdx]
}

function setLineDrag(isDrag) {
    if (!gMeme.lines.length) return

    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].isDrag = isDrag
}

function isLineClicked(clickedPos) {
    if (!gMeme.lines.length) return

    gMeme.lines.map((line, idx) => {
        var distance = Math.sqrt((line.pos.x - clickedPos.x) ** 2 + (line.pos.y - clickedPos.y) ** 2)
        if (distance <= line.size * line.txt.length) {
            gMeme.selectedLineIdx = idx
        }
    })
    const lineIdx = gMeme.selectedLineIdx
    const line = gMeme.lines[lineIdx]
    const { pos } = line

    setChosenLine(line)
    return true
}

function getChosenLine() {
    return gChosenLine
}

function moveLine(dx, dy) {
    const lineIdx = gMeme.selectedLineIdx

    gMeme.lines[lineIdx].pos.x += dx
    gMeme.lines[lineIdx].pos.y += dy
    _saveMemeToStorage()
}

function setChosenLine(line) {
    gChosenLine = line
    return gChosenLine
}

function drawRect(x, y, sizeX, sizeY) {
    gCtx.beginPath()

    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 1
    gCtx.strokeRect(x, y, sizeX, sizeY)
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}