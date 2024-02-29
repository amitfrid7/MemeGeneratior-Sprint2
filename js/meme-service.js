'use strict'

let gStartPos
let gChosenLine
const STORAGE_KEY = 'memeDB'
const gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords: ['funny'] },
    { id: 3, url: 'img/meme-imgs (square)/3.jpg', keywords: ['funny'] },
    { id: 4, url: 'img/meme-imgs (square)/4.jpg', keywords: ['funny'] },
    { id: 5, url: 'img/meme-imgs (square)/5.jpg', keywords: ['funny'] },
    { id: 6, url: 'img/meme-imgs (square)/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'img/meme-imgs (square)/7.jpg', keywords: ['funny'] },
    { id: 8, url: 'img/meme-imgs (square)/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'img/meme-imgs (square)/9.jpg', keywords: ['funny'] },
    { id: 10, url: 'img/meme-imgs (square)/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'img/meme-imgs (square)/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'img/meme-imgs (square)/12.jpg', keywords: ['funny'] },
    { id: 13, url: 'img/meme-imgs (square)/13.jpg', keywords: ['funny'] },
    { id: 14, url: 'img/meme-imgs (square)/14.jpg', keywords: ['funny'] },
    { id: 15, url: 'img/meme-imgs (square)/15.jpg', keywords: ['funny'] },
    { id: 16, url: 'img/meme-imgs (square)/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'img/meme-imgs (square)/17.jpg', keywords: ['funny'] },
    { id: 18, url: 'img/meme-imgs (square)/18.jpg', keywords: ['funny'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
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
        lines: []
    }
}

function setLineTxt(txt) {
    const lineIdx = gMeme.selectedLineIdx
    if (!gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
        addLine()
    }
    gMeme.lines[lineIdx].txt = txt
    _saveMemeToStorage()
}

function getImgById(id) {
    return gImgs.find(img => id === img.id)
}

function increaseFont() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size++
    _saveMemeToStorage()
}

function decreaseFont() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].size--
    _saveMemeToStorage()
}

function addLine(pos = { x: 200, y: 100 }) {
    gMeme.lines.push(
        {
            txt: 'New line',
            size: 20,
            color: 'black',
            pos,
            isDrag: false
        })
    saveToStorage(STORAGE_KEY, gMeme)
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length) gMeme.selectedLineIdx = 0
    console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)
}

function deleteLine() {
    gMeme.selectedLineIdx = 0
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    saveToStorage(STORAGE_KEY, gMeme)
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
    else return gMeme.lines[lineIdx]
}

function setLineDrag(isDrag) {
    if (!gMeme.lines.length) return
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].isDrag = isDrag
}

function isLineClicked(clickedPos) {
    if (!gMeme.lines.length) return

    //TRY:
    gMeme.lines.map((line, idx) => {
        var distance = Math.sqrt((line.pos.x - clickedPos.x) ** 2 + (line.pos.y - clickedPos.y) ** 2)
        if (distance <= line.size * line.txt.length) {
            gMeme.selectedLineIdx = idx
        }
    })
    const lineIdx = gMeme.selectedLineIdx
    const line = gMeme.lines[lineIdx]
    const { pos } = line


    drawRect(pos.x - line.txt.length * line.size / 4, pos.y - line.size, line.size * line.txt.length, line.size * 1.5)

    setChosenLine(line)
    return true

    //WORKS:
    // const lineIdx = gMeme.selectedLineIdx
    // const line = gMeme.lines[lineIdx]
    // const { pos } = line

    // // Calc the distance between two dots
    // const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)

    // //If its smaller then the radius of the circle we are inside
    // drawRect(pos.x - line.txt.length * line.size / 4, pos.y - line.size, line.size * line.txt.length, line.size * 1.5)
    // return (distance <= line.size * line.txt.length)
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

    gCtx.strokeStyle = 'lightblue'
    gCtx.lineWidth = 1
    gCtx.strokeRect(x, y, sizeX, sizeY)
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}