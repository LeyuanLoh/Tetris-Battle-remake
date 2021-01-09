import { tetris } from './tetris.js'

export class tShape extends tetris {
    constructor() {
        let shape = [{ x: 4, y: 0 }, { x: 4, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }]
        super(shape, "legoTShape")
    }
}