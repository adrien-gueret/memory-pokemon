import MemoryGameFactory from './MemoryGameFactory';

declare const __dirname;
declare const process;

const gameFactory = new MemoryGameFactory();

gameFactory.listen();

(gameFactory as any).io.origins((origin, callback) => {
    console.log('check origin', origin);
    callback(null, true);
});