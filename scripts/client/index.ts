import MemoryGame from './MemoryGame';

import EndPhase from './EndPhase';
import NewGamePhase from './NewGamePhase';
import TitlePhase from './TitlePhase';
import ClickCardPhase from './ClickCardPhase';
import CheckPhase from './CheckPhase';

import 'ludumjs/ludumjs.css';
import '../../style/index.css';

declare const process : {
    env: {
        SERVER_PORT?: number,
        SERVER_URL?: string,
    }
}

const game = new MemoryGame(document.getElementById('game'));

game.registerPhases([TitlePhase, NewGamePhase, ClickCardPhase, CheckPhase, EndPhase]);

game.connect(process.env.SERVER_PORT, process.env.SERVER_URL);