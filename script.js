let books = [];

fetch('books.json')
    .then(response => response.json())
    .then(data => {
        books = data;
    })
    .catch(error => console.error('Error fetching book data:', error));

function searchBook() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const book = books.find(b => b.title.toLowerCase().includes(searchQuery));

    if (book) {
        document.getElementById('book-info').style.display = 'block';
        document.getElementById('book-title').innerText = book.title;
        document.getElementById('book-author').innerText = `Author: ${book.author}`;
        const statusElement = document.getElementById('book-status');
        const availabilityElement = document.getElementById('book-availability');

        if (book.status === 'Available') {
            statusElement.innerText = 'Available';
            statusElement.id = 'book-status-available';
            availabilityElement.innerText = 'This book is available to borrow';
        } else {
            statusElement.innerText = 'Unavailable';
            statusElement.id = 'book-status-unavailable';
            availabilityElement.innerText = `This book is currently unavailable until ${book.checkoutDate}.`;
        }
    } else {
        alert('We cannot find this book');
    }
}

function adjustFontSize() {
    const fontSize = document.getElementById('font-size-slider').value + 'px';
    document.body.style.fontSize = fontSize;
}

document.getElementById('font-adjust').addEventListener('click', () => {
    const sliderContainer = document.getElementById('font-slider-container');
    sliderContainer.style.display = sliderContainer.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('voice-over').addEventListener('click', function() {
    const bookTitle = document.getElementById('book-title').innerText;
    const bookAuthor = document.getElementById('book-author').innerText;
    const bookStatus = document.getElementById('book-status').innerText;
    const speechText = `Title: ${bookTitle}, Author: ${bookAuthor}, Status: ${bookStatus}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
});