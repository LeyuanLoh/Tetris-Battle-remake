import { tetris } from './tetris.js'

export class square extends tetris {
    constructor(lastRenderedTime) {
        let shape = [{ x: 4, y: 0 }, { x: 4, y: 1 }, { x: 5, y: 0 }, { x: 5, y: 1 }]
        super(shape, lastRenderedTime, "legoSquare")
        super.offset = [
            [{ x: 0, y: 0 }],
            [{ x: 0, y: -1 }],
            [{ x: -1, y: -1 }],
            [{ x: -1, y: 0 }]
        ]
    }
}