import { Phase } from 'ludumjs/client';
import MemoryGame from './MemoryGame';

export default class TitlePhase extends Phase {
    game: MemoryGame;
    static id = 'TitlePhase';
    
    onAction({ action, target }) {
        switch(action) {
            case 'play':
                this.game.getSocket().emit('newGame', target.dataset.difficulty);
            return;
        }
    }
}