import { GRID_height, GRID_width, grid, clearLine } from './tetrisBoard.js'

export class tetris {
    constructor(shape, styleClass) {
        this.shape = [...shape]
        this.endLeft = false
        this.endRight = false
        this.tetrisBoard = document.getElementById('tetris-board')
        this.canDraw = true
        this.dropBoo = false
        this.styleClass = styleClass
        this.offset = [
            [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
            [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
            [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }, ]
        ]
        this.rotIndex = 0
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

    clearLines() {
        let rowsMap = new Map()
        this.shape.forEach(segment => {
            if (!rowsMap.has(segment.y)) {
                rowsMap.set(segment.y, segment.y)
            }
        })

        let rows = new Array()
        for (let key of rowsMap.keys()) {
            rows.push(key)
        }

        //ascending orders
        rows.sort(function(a, b) { return a - b })

        clearLine(rows)
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

        let newPos = []

        for (let i = 0; i < this.shape.length; i++) {
            let relativeX = (this.shape[1].x - this.shape[i].x)
            let relativeY = (this.shape[1].y - this.shape[i].y)

            let newRelativeX = relativeY
            let newRelativeY = -relativeX

            let newX = newRelativeX + this.shape[1].x
            let newY = newRelativeY + this.shape[1].y

            newPos.push({ newX, newY })
        }

        if (this.Offset(newPos)) {
            if (this.rotIndex === 3) {
                this.rotIndex = 0
            } else
                this.rotIndex++
        }

        this.canFall()
    }

    Offset(newPos) {
        let movePosible = false
        let endOffset = { x: 0, y: 0 }

        for (let testIndex = 0; testIndex < this.offset[this.rotIndex].length; testIndex++) {
            let offsetVal1 = this.offset[this.rotIndex][testIndex]
            let offsetVal2 = this.offset[(this.rotIndex + 1) % 4][testIndex]
            endOffset = { x: offsetVal1.x - offsetVal2.x, y: offsetVal1.y - offsetVal2.y }

            if (this.canMovePiece(newPos, endOffset)) {
                movePosible = true
                break
            }
        }

        if (movePosible) {
            this.movePiece(newPos, endOffset)
        }

        return movePosible
    }

    canMovePiece(newPos, endOffset) {
        for (let i = 0; i < newPos.length; i++) {
            //the newPos + endOffset must be in the grid and grid[][] should not return true
            if (newPos[i].newX + endOffset.x > -1 && newPos[i].newX + endOffset.x < GRID_width &&
                newPos[i].newY - endOffset.y > -1 && newPos[i].newY - endOffset.y < GRID_height &&
                (!grid[newPos[i].newX + endOffset.x][newPos[i].newY - endOffset.y])) {
                continue
            } else
                return false
        }
        return true
    }

    movePiece(newPos, endOffset) {


        for (let i = 0; i < this.shape.length; i++) {

            this.shape[i].x = newPos[i].newX
            this.shape[i].y = newPos[i].newY

            this.shape[i].x += endOffset.x
            this.shape[i].y -= endOffset.y
        }
    }

    //Must be called only after generate() in game.js
    canSpawn() {
        for (let i = 0; i < this.shape.length; i++) {
            if (grid[this.shape[i].x][this.shape[i].y]) {
                return false
            }
        }
        return true
    }

    getShape() {
        return this.shape
    }

}