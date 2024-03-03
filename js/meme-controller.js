'use strict'

let gElCanvas
let gCtx
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
    renderGallery()
    setLineDrag(false)

    addMouseListeners()
    addTouchListeners()

}

function renderMeme() {
    const meme = getMeme()
    const memeImg = getImgById(meme.selectedImgId)
    const img = new Image()

    img.src = memeImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.width, img.height)
        if (meme.lines.length) {
            const lines = meme.lines
            lines.forEach((line) => {
                renderLine(line)
            })
        }
    }
}

function renderLine(line) {
    gCtx.fillStyle = line.color,
    gCtx.font = `${line.size}px Impact`,
    gCtx.strokeStyle = 'black',
    gCtx.lineWidth = 1,
    gCtx.fillText(line.txt, line.pos.x, line.pos.y),
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
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

function onChoosingLine() {
    const line = getChosenLine()
    if (!line) return

    let txtInput = document.querySelector('.text-input')
    let colorInput = document.querySelector('.text-color')
    txtInput.placeholder = line.txt
    colorInput.placeholder = line.color
    drawRect(line.pos.x, line.pos.y - line.size, line.size * line.txt.length / 2 * 1.15, line.size + 10)
    document.body.style.cursor = 'grab'

}

function getEvPos(ev) {
    ev.preventDefault()         // Prevent triggering the mouse events
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()         // Prevent triggering the mouse events
        ev = ev.changedTouches[0]   // Gets the first touch point

        // Calc pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onDown(ev) {
    gStartPos = getEvPos(ev)
    if (!isLineClicked(gStartPos)) return

    setLineDrag(true)
    onChoosingLine()

    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const line = getLine()
    if (!line) return
    const { isDrag } = line
    if (!isDrag) return

    const pos = getEvPos(ev)

    // Calc the delta, the diff we moved
    var dx = pos.x - gStartPos.x
    var dy = pos.y - gStartPos.y
    moveLine(dx, dy)

    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos

    // The canvas is rendered again after every move
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'auto'
}

function addHidden(selector) {
    var strClass = '.'
    strClass += selector
    const el = document.querySelector(strClass)
    el.classList.add('hidden')
}

function removeHidden(selector) {
    var strClass = '.'
    strClass += selector
    const el = document.querySelector(strClass)
    el.classList.remove('hidden')
}

function openGallery() {
    addHidden('editor')
    addHidden('about')
    removeHidden('gallery')
}

function openEditor() {
    removeHidden('editor')
    removeHidden('gallery')
    addHidden('about')
}

function openAbout() {
    addHidden('gallery')
    addHidden('editor')
    removeHidden('about')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}