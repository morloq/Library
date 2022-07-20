let myLibrary = []; //array for storing books, each book is an object


document.querySelector(".addBook").addEventListener("click", () => {
    document.querySelector(".popup").style.display = "flex";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".popup").style.display = "none";
})
document.querySelector(".submit").addEventListener("click", () => {
    //get input from fields.
    let bookTitle = document.querySelector(".title").value;
    let bookAuthor = document.querySelector(".author").value
    let bookPages = document.querySelector(".pages").value;
    let bookRead ;
    if(document.getElementById("read").checked) {
        bookRead = Boolean(true);
    }
    else {
        bookRead = Boolean(false);
    }
    console.log(bookTitle, bookAuthor, bookPages, bookRead);

    const book = new Book(bookTitle, bookAuthor, bookPages, bookRead);//create new book with the current input

    addBookToLibrary(book);
});

//add book form validation:
//fields cannot be empty
//existing titles cannot be reused if the book already exists
//in general, check if the book already exists, if it does, do not add it

//check that input is valid
//pages -> only numbers
//author -> not numbers
//title -> leave relatively open as they can be weird

function Book(title, author, pages, read) {
    //constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);//convert to boolean value, otherwise it will be a string
}

function addBookToLibrary(book) {
    addBookToLibrary(book);//does not work, even if it did, not sure if there
    //would not be an error because I asigned the book function to a variable...


    document.querySelector(".popup").style.display = "none";

    myLibrary.push(book);
    
    console.log(myLibrary);
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