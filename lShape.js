import { tetris } from './tetris.js'

export class lShape extends tetris {
    constructor(lastRenderedTime) {
        let shape = [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }]
        super(shape, lastRenderedTime, "legolShape")
    }
}