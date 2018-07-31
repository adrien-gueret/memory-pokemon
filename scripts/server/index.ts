import MemoryGameFactory from './MemoryGameFactory';

declare const __dirname;
declare const process;

const gameFactory = new MemoryGameFactory();

gameFactory.listen();