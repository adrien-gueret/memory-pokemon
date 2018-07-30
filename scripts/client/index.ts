import MemoryGame from './MemoryGame';

import EndPhase from './EndPhase';
import NewGamePhase from './NewGamePhase';
import TitlePhase from './TitlePhase';
import ClickCardPhase from './ClickCardPhase';
import CheckPhase from './CheckPhase';

import 'ludumjs/ludumjs.css';
import '../../style/index.css';

const game = new MemoryGame(document.getElementById('game'));

game.registerPhases([TitlePhase, NewGamePhase, ClickCardPhase, CheckPhase, EndPhase]);

game.connect(1337);