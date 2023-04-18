const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/quotes', async (_req, res) => {
    const quotes = await DB.getQuotes();
    res.send(quotes);
});

apiRouter.post('/quote', async (req, res) => {
    DB.addQuote(req.body);
    const quotes = await DB.getQuotes();
    res.send(quotes);
});

app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});