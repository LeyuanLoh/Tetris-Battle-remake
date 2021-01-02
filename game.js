import { setGrid } from './tetrisBoard.js'

import { square } from './square.js'

import { tShape } from './tShape.js'

import { LineShape } from './LineShape.js'

import { LShape } from './LShape.js'

let lastRenderedTime = 0


const tetrisBoard = document.getElementById('tetris-board')

setGrid(tetrisBoard)

var tetris = new LShape(lastRenderedTime)

window.requestAnimationFrame(main)

function main(currentTime) {

    tetris.draw()

    window.requestAnimationFrame(main)

    const secondsSinceLastRender = (currentTime - lastRenderedTime) / 1000
    if (secondsSinceLastRender < 1 / 1.5) return

    lastRenderedTime = currentTime

    if (tetris.end()) {
        tetris.setAllTrue()
        generateTetris()
        return
    }
    tetris.fall()


}

let lastPress = 0;

window.addEventListener('keydown', e => {
    if (!tetris.getDrop()) {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
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
                e.preventDefault();
                let now = Date.now();
                if (now - lastPress < 500) break
                lastPress = now
                tetris.drop()
                tetris.setAllTrue()
                generateTetris()
                break
        }
    }
})

function generateTetris() {
    tetris = new square(lastRenderedTime)
}