const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const TwitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('lds-roller');

let apiQuotes = [];
//show new quote

// Show Loading 
function showLoadingSpinner() {
    loader.style.visibility = '';
    quoteContainer.hidden = true;
}

// Hide loading
function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.style.visibility = 'hidden';
}


function newQuote() {
    showLoadingSpinner();
    //Pick a random quote from ApiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
        // Checks if author field is blank and changes it to unknown
    if (!quote.author) {
        quoteAuthor.textContent = 'Unknown'
    } else {
        quoteAuthor.textContent = quote.author
    }
    //Check Quote Length
    if (quote.text.length > 75) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set Quote and hide loader
    quoteText.textContent = quote.text
    hideLoadingSpinner();
}

// If we wanted to change to local
// function localQuote() {
//     const quote = localQuote[Math.floor(Math.random() * localQuote.length)]
//     console.log(quote);
// }



// Get Quotes From API
async function getQuotes() {
    showLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const res = await fetch(apiURL);
        apiQuotes = await res.json();
        newQuote();
    } catch (err) {
        alert('Oh No!!', err)
    }

}


//Tweet Quote 
function tweetQuote() {
    const TwitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(TwitterUrl, '_blank')
}


//Event Listners
newQuoteBtn.addEventListener('click', newQuote)
TwitterBtn.addEventListener('click', tweetQuote)


// On Load 
getQuotes();