async function getBooks() {
    var subject = document.getElementById('trope').value.trim();
    var message = document.getElementById('errorMessage');

    if (subject.includes(' ')) {
        message.textContent = 'Please enter only one word.';
        return;
    }

    var url = `https://openlibrary.org/subjects/${subject.toLowerCase()}.json`;

    try {
        var response = await fetch(url);
        var data = await response.json();
        if (data.error) {
            throw new Error(data.error.message); 
        }
        displayBooks(data.works);
    } catch (error) {
        console.error('Error fetching data:', error);
        message.textContent = 'An error occurred while fetching data. Please try again later.';
    }
}

function displayBooks(works) {
    var books = document.getElementById('books');
    books.innerHTML = '';

    var selectedBooks = works.sort(() => 0.5 - Math.random()).slice(0, 5);

    selectedBooks.forEach(book => {
        var bookElement = document.createElement('div');
        bookElement.classList.add('book');

        var coverImageUrl = book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
            : 'images/placeholder.svg';

        bookElement.innerHTML = `
            <img src="${coverImageUrl}" alt="${book.title}">
            <p class="book-title">Title: ${book.title}</p>
            <p class="book-author">Author: ${book.authors.map(author => author.name).join(', ')}</p>
        `;

        books.appendChild(bookElement);
    });
}

function validateInput() {
    var subject = document.getElementById('trope').value.trim();
    var message = document.getElementById('errorMessage');

    if (subject.includes(' ')) {
        message.textContent = 'Please enter only one word.';
    } else {
        message.textContent = '';
    }
}
