import { Phase } from 'ludumjs/client';
import MemoryGame from './MemoryGame';

export default class CheckPhase extends Phase {
    game: MemoryGame;
    static id = 'CheckPhase';

    onStart({ cardIndex, cardCoordinates, isSuccess }) {
        const { column, row } = cardCoordinates;
        const domElement = <HTMLElement> this.game.cardsContainer.children[cardIndex];

        domElement.classList.add('card--visible', 'card--appearing');

        window.setTimeout(() => {
            domElement.style.setProperty('--sprite-row', row);
            domElement.style.setProperty('--sprite-column', column);
            domElement.classList.remove('card--appearing');

            if (isSuccess === null) {
                this.game.lastRevealedCardIndex = cardIndex;
                this.game.goToPhaseById('ClickCardPhase');
            } else {
                const lastDomElement = <HTMLElement> this.game.cardsContainer.children[this.game.lastRevealedCardIndex];

                if (isSuccess === false) {
                    domElement.classList.add('card--error');
                    lastDomElement.classList.add('card--error');

                    window.setTimeout(() => {
                        domElement.classList.add('card--disappearing');
                        lastDomElement.classList.add('card--disappearing');

                        window.setTimeout(() => {
                            domElement.style.removeProperty('--sprite-row');
                            domElement.style.removeProperty('--sprite-column');
                            domElement.classList.remove('card--visible', 'card--error');
    
                            lastDomElement.style.removeProperty('--sprite-row');
                            lastDomElement.style.removeProperty('--sprite-column');
                            lastDomElement.classList.remove('card--visible', 'card--error');
    
                            domElement.classList.remove('card--disappearing');
                            lastDomElement.classList.remove('card--disappearing');

                            this.game.goToPhaseById('ClickCardPhase');
                        }, 300);
                    }, 700);
                } else {
                    domElement.classList.add('card--success');
                    lastDomElement.classList.add('card--success');

                    window.setTimeout(() => {
                        domElement.classList.remove('card--success');
                        lastDomElement.classList.remove('card--success');
                    }, 800);
                    this.game.goToPhaseById('ClickCardPhase');
                }
                this.game.lastRevealedCardIndex = null;
            }
        }, 300);
    }
}