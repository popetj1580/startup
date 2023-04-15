const express = require('express');
const app = express();

const port = process.argv.length > 2 ? argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/quotes', (_req, res) => {
    res.send(quotes);
});

apiRouter.post('/quote', (req, res) => {
    quotes = addQuote(req.body);
    res.send(quotes);
});

app.use((_req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

let quotes = [];

function addQuote(quote) {
    quotes.push(quote);
    return quotes;
}