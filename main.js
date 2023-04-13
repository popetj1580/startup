const quoteListEl = document.querySelector("#quoteList");
const inputEl = document.querySelector("#quoteText");
let quotes = [];

function addQuote() {
    if (inputEl.value) {
        console.log("Function addQuote called.");
        quotes.push(inputEl.value);
        inputEl.value = "";
        const quoteEl = document.createElement("li");
        quoteEl.textContent = quotes[quotes.length - 1];

        quoteListEl.appendChild(quoteEl);
    }
}