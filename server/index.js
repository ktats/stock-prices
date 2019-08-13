//for another project do something with web sockets
// server can connect with client, low overhead rather than HTTP
// super inefficient, always relied on client responding to server. Web sockets allow constant connection
const express = require('express');
const app = express();
const path = require('path');
const port = 2000;

const stockDataHandler = require('./controllers/stockDataHandler.js').stockDataHandler;
const infoHandler = require('./controllers/infoHandler.js').infoHandler;


app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));


app.get('/stocks/:ticker/:timeframe', stockDataHandler)

app.get('/info/:ticker', infoHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});