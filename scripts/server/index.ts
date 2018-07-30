import * as express from 'express';
import MemoryGameFactory from './MemoryGameFactory';

declare const __dirname;
declare const process;

const gameFactory = new MemoryGameFactory();

gameFactory.listen();

const app = express();

const distDir = __dirname + '/../../dist/';

app.use(express.static(distDir));

const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log('Client now running on port', port);
});