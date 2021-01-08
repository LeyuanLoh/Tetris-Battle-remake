import { GRID_height, GRID_width, grid } from './tetrisBoard.js'

export class tetris {
    constructor(shape, lastRenderedTime, styleClass) {
        this.shape = [...shape]
        this.lastRenderedTime = lastRenderedTime
        this.endLeft = false
        this.endRight = false
        this.tetrisBoard = document.getElementById('tetris-board')
        this.canDraw = true
        this.dropBoo = false
        this.styleClass = styleClass
    }


    draw() {
        if (!this.canDraw) {
            return
        }
        this.shape.forEach(segment => {
            const shapeElement = document.createElement('div')
            shapeElement.classList.add(this.styleClass)
            shapeElement.style.position = "absolute"
            shapeElement.style.top = "0"
            shapeElement.style.left = "0"
            shapeElement.style.bottom = "0"
            shapeElement.style.right = "0"
            let cell = document.getElementById('cell ' + segment.x + " " + segment.y)
            if (cell !== null) {
                cell.style.border = "0.001vmin solid black"
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

    rotate() {

        this.undraw()

        //The origin for each shape is always at [1]
        for (let i = 0; i < this.shape.length; i++) {
            let relativeX = (this.shape[1].x - this.shape[i].x)
            let relativeY = (this.shape[1].y - this.shape[i].y)

            let newRelativeX = relativeY
            let newRelativeY = -relativeX

            this.shape[i].x = newRelativeX + this.shape[1].x
            this.shape[i].y = newRelativeY + this.shape[1].y
        }

        this.canFall()
    }

}