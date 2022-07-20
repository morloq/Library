let myLibrary = []; //array for storing books, each book is an object

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const checkbox = document.getElementById("read");

const error = document.querySelector(".error");

document.querySelector(".addBook").addEventListener("click", () => {
    document.querySelector(".popup").style.display = "flex";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".popup").style.display = "none";
})
document.querySelector(".submit").addEventListener("click", function(event) {

    event.preventDefault();
    
    //get input from fields.
    let bookTitle = title.value;
    let bookAuthor = author.value;
    let bookPages = pages.value;
    let bookRead ;
    if(checkbox.checked) {
        bookRead = Boolean(true);
    }
    else {
        bookRead = Boolean(false);
    }
    if(bookTitle.length > 0 && bookAuthor.length > 0 && bookPages.length > 0) {
        const book = new Book(bookTitle, bookAuthor, bookPages, bookRead);//create new book with the current input
        if(isInLibrary(book)) {
            error.textContent = "This book is already in your library";
        }
        else {
            addBookToLibrary(book);
            document.querySelector(".popup").style.display = "none";
            reset();
        }
    }
    else {
        error.textContent = "Fill out all fields";
    }
});

function reset() {
    title.value = null;
    author.value = null;
    pages.value = null;
    checkbox.checked = false;
    error.textContent = "";
}

function Book(title, author, pages, read) {
    //constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);//convert to boolean value, otherwise it will be a string
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(myLibrary);
}

function isInLibrary(book) {
    let includes = false;
    for(i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].title == book.title) {
            includes = true;
        }
        else {
            includes = false;
        }
    }
    return includes;
}

function displayBooksInLibrary() {
    //display all books, maybe on individual cards that pop up
    for(prop in myLibrary) {
        //add book to grid.
    }
}

//change read status
function changeReadStatus() {
    //check if read button has been clicked, check current status, change 
    //to other status accordingly
}
//remove books

function remove() {
    //check if remove button on book panel was clicked, if yes, remove panel and
    //also remove book from array
}

//submit button click should add new bock

console.log(myLibrary);