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
            tetrisBoard.appendChild(cell)
            grid[i][j] = false;
        }
    }
}