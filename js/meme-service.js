'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'black'
        }
    ]
}

const STORAGE_KEY = 'memeDB'
const gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    gMeme = loadFromStorage(STORAGE_KEY)
    return gMeme
}

function setLineTxt(txt) {
    const lineIdx = gMeme.selectedLineIdx
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

function addLine() {
    gMeme.lines.push(
        {
        txt: 'New line',
        size: 20,
        color: 'black'
    })
    gMeme.selectedLineIdx++
    saveToStorage(STORAGE_KEY, gMeme)
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx - 1 > gMeme.lines.length) gMeme.selectedLineIdx = 0
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

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}