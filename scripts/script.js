function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){

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
        for(let i = 0; i < this.books.length; i++){
            if (this.books[i].title === title){
                return i;
            }
        }
    }

    isInLibrary(newBook){
        return this.books.some((book) => book.title ===newBook.title);
    }

    addToDom(newBook){
        let book = document.createElement('div');
        book.className = 'book';
        book.id = 'book' + newBook.title;

        let container = document.getElementById('container');
        container.appendChild(book);

        const title = document.createElement('div');
        title.innerHTML = newBook.title;
        title.className = "info";

        const author = document.createElement('div');
        author.innerHTML = "By: " + newBook.author;
        author.className = "info";

        const pages = document.createElement('div');
        pages.innerHTML = "Pages: " + newBook.pages;
        pages.className = "info";

        const read = document.createElement('button');
        read.className = "readbtn";
        read.value = newBook.title;
        read.id = "readbtn" + newBook.title;

        if(newBook.read === true){
            read.style.backgroundColor = "#9fff9c";
            read.innerHTML = "Read";
        }
        else{
            read.style.backgroundColor = '#ff9c9c';
            read.innerHTML = "Unread";
        }

        const remove = document.createElement('button');
        remove.className = "remove";
        remove.innerHTML = "Remove";
        remove.id = "remove" + newBook.title;
        remove.value = newBook.title;



        read.addEventListener("click", readUnread);
        remove.addEventListener("click", remove_book);
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(read);
        book.appendChild(remove);

    }
}

function remove_book(event){
    library.removeBook(event.target.value);
    const book = document.getElementById("book" + event.target.value);
    book.remove();
}

function readUnread(event){
    const read = document.getElementById("readbtn" + event.target.value);
    
    if (read.innerHTML === "Read"){
        read.innerHTML = "Unread";
        read.style.backgroundColor = '#ff9c9c';
        library.books[library.getBook(event.target.value)].read = false;
    } 

    else{
        read.style.backgroundColor = "#9fff9c";
        read.innerHTML = "Read";
        library.books[library.getBook(event.target.value)].read = true;
    }
}

const library = new Library();

function submitForm(event){
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;

    if(title === "" || author === "" || pages === ""){
        document.querySelector('#new_book').disabled = false;
        alert("Fill out the whole form.")
        event.preventDefault();
        return;
    }

    let tempBook = new Book(document.querySelector('#title').value, document.querySelector('#author').value, document.querySelector('#pages').value, document.querySelector('#read').checked);

    if (library.isInLibrary(tempBook)){
        document.querySelector('#new_book').disabled = false;
        alert("Can't add duplicate books")
        event.preventDefault();
        return;
    }
    library.addBook(tempBook);
    document.querySelector('#new_book').disabled = false;
    event.preventDefault();
    const form = document.getElementById('#form');
    form.remove();

    library.addToDom(tempBook);
}

function newBook(){
    document.querySelector('#new_book').disabled = true;

    const form = document.createElement("form");
    form.method = "post";
    form.id = "#form";

    document.getElementById("container").appendChild(form);

    const divTitle = document.createElement("div");
    form.appendChild(divTitle);

    const title = document.createElement("input");
    title.id = 'title';
    title.type = 'text';
    title.placeholder = 'Title';
    title.className = 'input';
    divTitle.appendChild(title);

    const divAuthor = document.createElement("div");
    form.appendChild(divAuthor);

    const author = document.createElement("input");
    author.id = 'author';
    author.type = 'text';
    author.placeholder = 'Author';
    author.className = 'input';
    divAuthor.appendChild(author);

    const divPages = document.createElement("div");
    form.appendChild(divPages);

    const pages = document.createElement("input");
    pages.id = 'pages';
    pages.type = 'number';
    pages.placeholder = 'Pages';
    pages.className = 'input';
    divPages.appendChild(pages);

    const divRead = document.createElement("div");
    form.appendChild(divRead);

    const readLabel = document.createElement("label");
    readLabel.for = 'read';
    readLabel.innerHTML = 'Read?';
    divRead.appendChild(readLabel);

    const read = document.createElement("input");
    read.type = 'checkbox';
    read.id = 'read';
    read.name = 'read';
    read.className = 'checkbox';
    divRead.appendChild(read);

    const divSubmit = document.createElement("div");
    form.appendChild(divSubmit);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Submit";
    submitButton.className = "submit";

    divSubmit.appendChild(submitButton);

    submitButton.addEventListener("click", submitForm, false);
}