import { OnlineGame } from 'ludumjs/client';
import { socketEvent } from 'ludumjs/common';

export default class MemoryGame extends OnlineGame {
    public cardsContainer: HTMLElement;
    public lastRevealedCardIndex: number | null;

    constructor(domContainer: HTMLElement) {
        super(domContainer);

        this.cardsContainer = document.getElementById('cards');
        this.lastRevealedCardIndex = null;
    }

    resetCards(totalCards: number) {
        while (this.cardsContainer.firstChild) {
            this.cardsContainer.removeChild(this.cardsContainer.firstChild);
        }

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < totalCards; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.action = 'showCard';
            card.dataset.index = i.toString();
            fragment.appendChild(card);
        }

        this.cardsContainer.appendChild(fragment);
    }

    @socketEvent
    connection() {
        this.start();
    }

    @socketEvent
    connect_error() {
        console.error('Can\'t connect to server.');
    }
};