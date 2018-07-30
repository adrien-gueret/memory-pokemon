import { socketEvent } from 'ludumjs/common';
import { GameFactory } from 'ludumjs/server';

import MemoryGame from './MemoryGame';
import { disconnect } from 'cluster';

class MemoryGameFactory extends GameFactory {
    games: Array<MemoryGame>;

    constructor() {
        super(MemoryGame);
    }

    @socketEvent
    newGame(socket, difficulty) {
        const game = <MemoryGame>this.create(socket);
        game.initNewGame(difficulty);
    }

    @socketEvent
    disconnect(disconnectedSocket) {
        const correspondingGames = this.games.filter(game => (
            game.getSockets().some(socket => socket.id === disconnectedSocket.id)
        ));

        correspondingGames.forEach(game => game.end());
    }
}

export default MemoryGameFactory;