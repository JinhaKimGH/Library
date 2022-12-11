function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        let temp_read = true;
        if (this.read === "on"){
            temp_read = false;
        }

        return this.title + " by " + this.author + ", " + this.pages + " pages, " + (temp_read ? "not" : "") + " read.";
    }
}

class Library {
    constructor(){
        this.books = [];
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook);
        }
    }

    removeBook(title){
        this.books = this.books.filter((book) => book.title !== title);
    }

    getBook(title){
        return this.books.find((book) => book.title === title);
    }

    isInLibrary(newBook){
        return this.books.some((book) => book.title ===newBook.title);
    }
}

const library = new Library();

function submitForm(event){
    alert(document.querySelector('#read').value);
    let tempBook = new Book(document.querySelector('#title').value, document.querySelector('#author').value, document.querySelector('#pages').value, document.querySelector('#read').value);
    library.addBook(tempBook);
    alert(tempBook.info());
    event.preventDefault();
}

function newBook(){
    const form = document.getElementById("form");

    const divTitle = document.createElement("div");
    form.appendChild(divTitle);

    const titleLabel = document.createElement("label");
    titleLabel.for = 'title';
    titleLabel.innerHTML = 'Title';
    divTitle.appendChild(titleLabel);

    const title = document.createElement("input");
    title.id = 'title';
    title.type = 'text';
    divTitle.appendChild(title);

    const divAuthor = document.createElement("div");
    form.appendChild(divAuthor);

    const authorLabel = document.createElement("label");
    authorLabel.for = 'author';
    authorLabel.innerHTML = 'Author';
    divAuthor.appendChild(authorLabel);

    const author = document.createElement("input");
    author.id = 'author';
    author.type = 'text';
    divAuthor.appendChild(author);

    const divPages = document.createElement("div");
    form.appendChild(divPages);

    const pagesLabel = document.createElement("label");
    pagesLabel.for = 'pages';
    pagesLabel.innerHTML = 'Pages';
    divPages.appendChild(pagesLabel);

    const pages = document.createElement("input");
    pages.id = 'pages';
    pages.type = 'number';
    divPages.appendChild(pages);

    const divRead = document.createElement("div");
    form.appendChild(divRead);

    const readLabel = document.createElement("label");
    readLabel.for = 'read';
    readLabel.innerHTML = 'Have you read this book?';
    divRead.appendChild(readLabel);

    const read = document.createElement("input");
    read.type = 'checkbox';
    read.id = 'read';
    read.name = 'read';
    divRead.appendChild(read);

    const divSubmit = document.createElement("div");
    form.appendChild(divSubmit);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Submit";

    divSubmit.appendChild(submitButton);

    submitButton.addEventListener("click", submitForm, false);
}