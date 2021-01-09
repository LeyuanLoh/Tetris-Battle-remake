import { setGrid } from './tetrisBoard.js'

import { square } from './square.js'

import { tShape } from './tShape.js'

import { LineShape } from './LineShape.js'

import { LShape } from './LShape.js'

import { invertedLShape } from './invertedLShape.js'

import { zShape } from './zShape.js'

import { invertedZShape } from '/invertedZShape.js'

let lastRenderedTime = 0

let gameOver = false

const tetrisBoard = document.getElementById('tetris-board')

setGrid(tetrisBoard)

var tetris

generateTetris()

window.requestAnimationFrame(main)

function main(currentTime) {

    if (gameOver) {
        return
    }

    tetris.draw()

    window.requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderedTime) / 1000
    if (secondsSinceLastRender < 1 / 1.5) return

    lastRenderedTime = currentTime

    if (tetris.end()) {
        tetris.setAllTrue()
        tetris.clearLines()
        generateTetris()
        return
    }
    tetris.fall()


}

let lastPress = 0;

//True if a key is pressed down
let keys = [false, false]

window.addEventListener('keydown', e => {
    if (!tetris.getDrop() && !gameOver) {
        switch (e.key) {
            case 'ArrowUp':
                if (keys[0] === true) {
                    break
                }
                e.preventDefault();
                tetris.rotate()
                keys[0] = true
                break
            case 'ArrowDown':
                e.preventDefault();
                tetris.fall()
                break
            case 'ArrowLeft':
                e.preventDefault();
                tetris.moveLeft()
                break
            case 'ArrowRight':
                e.preventDefault();
                tetris.moveRight()
                break
            case ' ':
                if (keys[1] === true) {
                    break
                }
                e.preventDefault();
                tetris.drop()
                tetris.setAllTrue()
                tetris.clearLines()
                generateTetris()
                keys[1] = true
                break
        }
    }
})

window.addEventListener('keyup', e => {
    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            keys[0] = false
            break
        case ' ':
            e.preventDefault();
            keys[1] = false
            break
    }
})




function generateTetris() {
    let num = Math.floor(Math.random() * 7)

    //debugging purposes
    // tetris = new square(lastRenderedTime)

    switch (num) {

        case 0:
            tetris = new LineShape(lastRenderedTime)
            break
        case 1:
            tetris = new invertedLShape(lastRenderedTime)
            break
        case 2:
            tetris = new LShape(lastRenderedTime)
            break
        case 3:
            tetris = new square(lastRenderedTime)
            break
        case 4:
            tetris = new invertedZShape(lastRenderedTime)
            break
        case 5:
            tetris = new tShape(lastRenderedTime)
            break
        case 6:
            tetris = new zShape(lastRenderedTime)
            break
    }

    if (!tetris.canSpawn()) {
        gameOver = true
    }
}