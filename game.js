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

var tetris

let tetrisFallSpeed = 1.5

const tetrisBoard = document.getElementById('tetris-board')

setGrid(tetrisBoard)


generateTetris()

window.requestAnimationFrame(main)


function main(currentTime) {

    if (gameOver) {
        return
    }

    tetris.draw()

    window.requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderedTime) / 1000
    if (secondsSinceLastRender >= 1 / tetrisFallSpeed) {
        lastRenderedTime = currentTime
        tetris.fall()
        return
    }

    if (tetris.end()) {
        tetris.setAllTrue()
        tetris.clearLines()
        generateTetris()
        return
    }



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
                    // tetris.setAllTrue()
                    // tetris.clearLines()
                    // generateTetris()
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
            tetris = new LineShape()
            break
        case 1:
            tetris = new invertedLShape()
            break
        case 2:
            tetris = new LShape()
            break
        case 3:
            tetris = new square()
            break
        case 4:
            tetris = new invertedZShape()
            break
        case 5:
            tetris = new tShape()
            break
        case 6:
            tetris = new zShape()
            break
    }

    if (!tetris.canSpawn()) {
        gameOver = true
    }
}