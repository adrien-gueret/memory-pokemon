import { Phase } from 'ludumjs/client';
import MemoryGame from './MemoryGame';

export default class EndPhase extends Phase {
    game: MemoryGame;
    static id = 'EndPhase';

    onStart({ cardIndex, cardCoordinates, isSuccess }) {
        const { column, row } = cardCoordinates;
        const domElement = <HTMLElement> this.game.cardsContainer.children[cardIndex];

        domElement.classList.add('card--visible', 'card--appearing');

        window.setTimeout(() => {
            domElement.style.setProperty('--sprite-row', row);
            domElement.style.setProperty('--sprite-column', column);
            domElement.classList.remove('card--appearing');

            const lastDomElement = <HTMLElement> this.game.cardsContainer.children[this.game.lastRevealedCardIndex];

            domElement.classList.add('card--success');
            lastDomElement.classList.add('card--success');

            window.setTimeout(() => {
                domElement.classList.remove('card--success');
                lastDomElement.classList.remove('card--success');
                this.game.showDialog('end');
            }, 800);
           
            this.game.lastRevealedCardIndex = null;
        }, 300);
    }

    onAction({ action, target }) {
        if (action !== 'restart') {
            return;
        }

        this.game.getSocket().emit('restart', target.dataset.difficulty);
    }

    onEnd() {
        this.game.hideDialog('end');
    }
}