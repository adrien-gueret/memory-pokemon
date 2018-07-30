import { arrays } from 'ludumjs/common';

export default class Card {
    private id: number;

    constructor(id) {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    getCoordinate(): { row: number, column: number } {
        return arrays.convert1DIndexInto2DIndex(this.getId(), 12);
    }
}