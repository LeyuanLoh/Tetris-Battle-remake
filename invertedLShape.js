import { tetris } from './tetris.js'

export class invertedLShape extends tetris {
    constructor(lastRenderedTime) {
        let shape = [{ x: 3, y: 0 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }]
        super(shape, lastRenderedTime, "legoInvertedLShape")
    }
}