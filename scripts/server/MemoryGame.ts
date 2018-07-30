import { arrays, math, socketEvent } from 'ludumjs/common';
import { Game } from 'ludumjs/server';

import Card from './Card';

const BASE_TOTAL_DIFFERENT_CARDS = 5;
const DIFFICULTY_MULTIPLICATORS = {
    easy: 1,
    medium: 2,
    hard: 3,
};

class MemoryGame extends Game {
    private board: Array<Card>;
    private lastRevealedCard: Card|null;
    private totalValidPairs: number;

    initNewGame(difficulty: string) {
        const cardIds = [];
        const totalDifferentCards = BASE_TOTAL_DIFFERENT_CARDS * (DIFFICULTY_MULTIPLICATORS[difficulty] || 1);

        for (let i = 0; i < totalDifferentCards; i++) {
            let newId;
            
            do {
                newId = math.random(0, 150);
            } while (cardIds.some(id => id === newId));
            
            cardIds.push(newId, newId);
        }

        this.board = arrays.shuffleArray(cardIds).map(id => new Card(id));
        this.lastRevealedCard = null;
        this.totalValidPairs = 0;

        this.emitSwitchPhase('NewGamePhase', this.getTotalCards());
    }

    getTotalCards(): number {
        return this.board.length;
    }

    @socketEvent
    requestCard(socket, cardIndex) {
        const requestedCard = this.board[cardIndex];
        let isSuccess = null;

        if (this.lastRevealedCard === null) {
            this.lastRevealedCard = requestedCard;
        } else {
            isSuccess = this.lastRevealedCard.getId() === requestedCard.getId();
            this.lastRevealedCard = null;
        }

        let newPhase = 'CheckPhase';

        if (isSuccess) {
            this.totalValidPairs++;

            if (this.totalValidPairs === this.board.length / 2) {
                newPhase = 'EndPhase';
            }
        }

        this.emitSwitchPhase(newPhase, {
            cardCoordinates: requestedCard.getCoordinate(),
            cardIndex,
            isSuccess,
        });
    }

    @socketEvent
    restart(socket, difficulty) {
        this.initNewGame(difficulty);
    }
}

export default MemoryGame;