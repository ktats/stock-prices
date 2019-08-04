const express = require('express');
const app = express();
const path = require('path');
const port = 2000;

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/test', (req, res) => {
    res.send('whats up asfasdfasdf');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});