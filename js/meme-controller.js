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
                gCtx.fillStyle = line.color,
                gCtx.font = `bold ${line.size}px Arial`,
                gCtx.fillText(line.txt, line.pos.x, line.pos.y)
            }
            )
        }
    }
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
    //Save the pos we start from
    
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag } = getLine()
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
    document.body.style.cursor = 'grab'
}