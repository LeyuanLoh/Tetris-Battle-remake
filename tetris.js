import { GRID_height, GRID_width, grid } from './tetrisBoard.js'

export class tetris {
    constructor(shape, lastRenderedTime, styleId) {
        this.shape = [...shape]
        this.lastRenderedTime = lastRenderedTime
        this.endLeft = false
        this.endRight = false
        this.tetrisBoard = document.getElementById('tetris-board')
        this.canDraw = true
        this.dropBoo = false
        this.styleId = styleId
    }


    draw() {
        if (!this.canDraw) {
            return
        }
        this.shape.forEach(segment => {
            const shapeElement = document.createElement('div')
            shapeElement.style.gridRowStart = segment.y
            shapeElement.style.gridColumnStart = segment.x
            console.log('.legoTShape')
            shapeElement.classList.add(this.styleId)
            let cell = document.getElementById('cell ' + segment.x + " " + segment.y)
            if (cell !== null) {
                cell.style.paddingBottom = "0%"
                cell.style.border = 0
                cell.appendChild(shapeElement)
            }

        })
        this.canDraw = false
    }

    undraw() {
        this.shape.forEach(segment => {
            let cell = document.getElementById('cell ' + segment.x + " " + segment.y)
            if (cell != null) {
                cell.innerHTML = ' '
                cell.style.paddingBottom = "100%"
                cell.style.border = "0.001vmin solid white"
                this.canDraw = true
            }
        })
    }

    fall() {
        this.canFall()
        if (this.endBot) {
            return
        }
        this.undraw()
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].y += 1;
        }
    }

    canFall() {
        for (let i = 0; i < this.shape.length; i++) {
            if ((this.shape[i].y < GRID_height - 1 && grid[this.shape[i].x][this.shape[i].y + 1]) || this.shape[i].y >= GRID_height - 1) {
                this.endBot = true
                return
            }
        }
        this.endBot = false
    }

    drop() {
        this.dropBoo = true
        while (!this.endBot) {
            this.fall()
            this.draw()
        }
    }

    moveLeft() {
        this.canMoveLeft()
        if (this.endLeft) {
            return
        }
        this.undraw()
        if (this.endRight) {
            this.endRight = false;
        }
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].x--;
        }
        this.canFall()
    }

    canMoveLeft() {
        for (let i = 0; i < this.shape.length; i++) {
            if ((this.shape[i].x > 0 && grid[this.shape[i].x - 1][this.shape[i].y]) || this.shape[i].x <= 0) {
                this.endLeft = true
                return
            }
        }
        this.endLeft = false
    }

    moveRight() {
        this.canMoveRight()
        if (this.endRight) {
            return
        }
        this.undraw()
        if (this.endLeft) {
            this.endLeft = false;
        }
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].x++;
        }
        this.canFall()
    }

    canMoveRight() {
        for (let i = 0; i < this.shape.length; i++) {
            if ((this.shape[i].x < GRID_width - 1 && grid[this.shape[i].x + 1][this.shape[i].y]) || this.shape[i].x >= GRID_width - 1) {
                this.endRight = true
                return
            }
        }
        this.endRight = false
    }


    end() {
        return this.endBot
    }

    setAllTrue() {
        this.shape.forEach(segment => {
            grid[segment.x][segment.y] = true;
        })
    }

    getDrop() {
        return this.dropBoo
    }

}