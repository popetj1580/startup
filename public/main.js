const quoteListEl = document.querySelector("#quoteList");
const inputEl = document.querySelector("#quoteText");

inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addQuote();
    }
})

async function addQuote() {
    if (inputEl.value) {
        quoteString = inputEl.value;
        newQuote = {value: quoteString};
        console.log("Function addQuote called.");
        const response = await fetch('/api/quote', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newQuote),
        })

        quotes = await response.json();
        inputEl.value = '';
        console.log(quotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));

        displayQuotes(quotes);
        /*
        quotes.push(inputEl.value);
        inputEl.value = "";
        const quoteEl = document.createElement("li");
        quoteEl.textContent = quotes[quotes.length - 1];

        quoteListEl.appendChild(quoteEl);
        */
    }
}

async function loadQuotes() {
    try {
        const response = await fetch('/api/quotes');
        quotes = await response.json();

        localStorage.setItem('quotes', JSON.stringify(quotes));
    }
    catch {
        quotesText = localStorage.getItem('quotes');
        if (quotesText) {
            quotes = JSON.parse(quotesText);
        }
    }
    displayQuotes(quotes);
}

function displayQuotes(listOfQuotes) {
    //Clear out existing quotes
    quoteListEl.innerHTML = "";
    for (const [i, score] of listOfQuotes.entries()) {
        childEl = document.createElement('li');
        childEl.textContent = score.value;

        quoteListEl.appendChild(childEl);
    }
}

loadQuotes();