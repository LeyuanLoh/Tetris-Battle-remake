import { tetris } from './tetris.js'

export class LineShape extends tetris {
    constructor() {
        let shape = [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }]
        super(shape, "legoLineShape")
        super.offset = [
            [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }],
            [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -2 }],
            [{ x: -1, y: 1 }, { x: 1, y: 1 }, { x: -2, y: 1 }, { x: 1, y: 0 }, { x: -2, y: 0 }],
            [{ x: 0, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 0, y: 2 }, ]
        ]
    }
}