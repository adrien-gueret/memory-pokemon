import { Phase } from 'ludumjs/client';
import MemoryGame from './MemoryGame';

export default class NewGamePhase extends Phase {
    game: MemoryGame;
    static id = 'NewGamePhase';

    onStart(totalCards) {
        this.game.resetCards(totalCards);

        window.setTimeout(() => {
            this.game.goToPhaseById('ClickCardPhase');
        }, 0);
    }
}