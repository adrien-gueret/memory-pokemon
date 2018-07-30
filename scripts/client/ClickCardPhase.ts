import { Phase } from 'ludumjs/client';
import MemoryGame from './MemoryGame';

export default class ClickCardPhase extends Phase {
    game: MemoryGame;
    static id = 'ClickCardPhase';

    onAction({ action, target }) {
        if (action !== 'showCard') {
            return;
        }

        this.game.getSocket().emit('requestCard', +target.dataset.index);
    }
}