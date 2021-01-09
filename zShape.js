import { tetris } from './tetris.js'

export class zShape extends tetris {
    constructor() {
        let shape = [{ x: 3, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 0 }, { x: 5, y: 1 }]
        super(shape, "legoZShape")
    }
}