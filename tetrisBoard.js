export const GRID_width = 10;
export const GRID_height = 20;

export let grid = new Array(GRID_width)

for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(GRID_height)
}


export function setGrid(tetrisBoard) {
    document.getElementById("tetris-board").style.gridTemplateRows = "repeat(" + GRID_height + ", 1fr)"
    document.getElementById("tetris-board").style.gridTemplateColumns = "repeat(" + GRID_width + ", 1fr)"

    for (let i = 0; i < GRID_width; i++) {
        for (let j = 0; j < GRID_height; j++) {
            const cell = document.createElement('div')
            cell.style.gridRowStart = j + 1
            cell.style.gridColumnStart = i + 1
            cell.setAttribute("id", "cell " + i + " " + j)
            cell.classList.add('cell')
            cell.innerHTML = " "
            tetrisBoard.appendChild(cell)
            grid[i][j] = false;
        }
    }
}

//rows array of y coord
export function clearLine(rows) {
    for (let i = 0; i < rows.length; i++) {
        let canRemoved = true
        for (let j = 0; j < GRID_width; j++) {
            if (!grid[j][rows[i]]) {
                canRemoved = false
                break
            }
        }
        // the line can be cleared 
        // set grid[j][rows[i]] to be false
        // set the style
        if (!canRemoved) {
            continue
        }
        for (let j = 0; j < GRID_width; j++) {
            grid[j][rows[i]] = false

            let cell = document.getElementById('cell ' + j + " " + rows[i])
            if (cell != null) {
                cell.innerHTML = ' '
                cell.style.border = "0.001vmin solid white"
            }
        }

        moveLineDown(rows[i])
    }
}

function moveLineDown(row) {
    for (let i = 0; i < GRID_width; i++) {
        for (let j = row; j > -1; j--) {
            let cell = document.getElementById("cell " + i + " " + j)
            if (j === 0) {
                grid[i][j] = false
                if (cell != null) {
                    cell.innerHTML = ' '
                    cell.style.border = "0.001vmin solid white"
                }
                continue
            }
            let k = j - 1
            let cellPrevious = document.getElementById("cell " + i + " " + k)
            cell.innerHTML = cellPrevious.innerHTML
            if (cellPrevious.innerHTML != ' ') {
                cell.style.border = "0.001vmin solid black"
            }
            if (cell.innerHTML === ' ') {
                cell.style.border = "0.001vmin solid white"
            }
            grid[i][j] = grid[i][j - 1]
        }
    }
}