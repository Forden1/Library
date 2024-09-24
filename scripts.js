const addCardButton = document.getElementById('addCardButton');
const cardContainer = document.getElementById('card-container');

const MyLibrary = [];

// Constructor function for Book
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function() {
        let readStatus = this.hasRead ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    // Check for duplicates
    const isDuplicate = MyLibrary.some(book => book.title === title && book.author === author);
    
    if (isDuplicate) {
        alert("This book is already in the library.");
        return false;
    }
    
    // Create a new Book object and add it to MyLibrary
    const newBook = new Book(title, author, pages, read);
    MyLibrary.push(newBook);
    return true;
}

function display(books) {
    // Clear the cardContainer first
    cardContainer.innerHTML = '';

    for (let i = 0; i < books.length; i++) {
        let title = books[i].title;
        let author = books[i].author;
        let pages = books[i].pages;
        let hasRead = books[i].hasRead; // Use hasRead from the book object

        const card = document.createElement('div');
        card.classList.add('card');

        // Create title and author on the same line
        const titleElement = document.createElement('p');
        titleElement.textContent = `Title: ${title}`;
        card.appendChild(titleElement);
    
        // Create and append the author
        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${author}`;
        card.appendChild(authorElement);

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `Pages: ${pages}`;
        card.appendChild(pagesElement);

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const hasReadButton = document.createElement('button');

        function updateButton() {
            hasReadButton.textContent = hasRead ? 'Read' : 'Not-read';
            hasReadButton.className = hasRead ? 'read-button' : 'not-read-button';
        }

        updateButton();
        buttonContainer.appendChild(hasReadButton); // Add the read button to the button container

        hasReadButton.addEventListener('click', () => {
            hasRead = !hasRead; // Toggle the local variable
            books[i].hasRead = hasRead; // Update the hasRead property of the book object
            updateButton();
        });

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';

        removeButton.addEventListener('click', () => {
            MyLibrary.splice(i, 1); // Remove the book at index i
            display(MyLibrary); // Refresh the display
        });

        buttonContainer.appendChild(removeButton); // Add the remove button to the button container

        card.appendChild(buttonContainer); // Append the button container to the card
        cardContainer.appendChild(card); // Append the card to the cardContainer
    }
}

// Add sample books
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("Moby Dick", "Herman Melville", 585, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, true);

// Initial display
console.log(MyLibrary);
display(MyLibrary);

const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("#closeButton");
const bookForm = document.querySelector("#bookForm");
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    // Check if the book was added successfully
    if (addBookToLibrary(title, author, pages, read)) {
        alert("Book added to library.");
        display(MyLibrary);
    } 
});

closeButton.addEventListener("click", () => {
    dialog.close(); // Close the dialog
});

addCardButton.addEventListener("click", () => {
    dialog.showModal();
});

dialog.addEventListener('show', () => {
    dialog.style.transform = "translate(-50%, -50%) scale(1)";
});
