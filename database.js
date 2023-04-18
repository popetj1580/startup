const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Bad Environment');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const quoteCollection = client.db('startup').collection('quotes');

function addQuote(quote) {
    quoteCollection.insertOne(quote);
}

function getQuotes() {
    const query = {};
    const options = {};
    const cursor = quoteCollection.find(query, options);
    return cursor.toArray();
}

module.exports = {addQuote, getQuotes};