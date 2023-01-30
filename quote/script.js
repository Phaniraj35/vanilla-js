let apiQuotes = [];

const getQuotes = async () => {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        const quotes = await response.json();
        window.localStorage.setItem('__quotes_api_response__', JSON.stringify(quotes));
        return quotes
    } catch(error) {

    }
}

const quoteNode = document.getElementById('quote');
const authorNode = document.getElementById('author');
const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader');

function startLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function stopLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

const setQuote = () => {
    startLoading();

    localQuotes = window.localStorage.getItem('__quotes_api_response__');

    if (localQuotes === null) {
        apiQuotes = getQuotes()
    } else {
        apiQuotes = JSON.parse(localQuotes);
    }

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    quoteNode.innerText = quote.text;

    authorNode.innerText = quote.author;

    stopLoading();
}

const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteNode.textContent} - ${authorNode.textContent}`;
    window.open(twitterUrl, '_blank')
}

setQuote();

document.getElementById('new-quote').addEventListener('click', e => setQuote())

document.getElementById('twitter').addEventListener('click', e => tweetQuote())
