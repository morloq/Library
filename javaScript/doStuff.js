let myLibrary = []; //array for storing books, each book is an object

let counter = 0;

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
    let bookRead = checkbox.checked;

    if(bookTitle.length && bookAuthor.length && bookPages.length && bookPages > 0) {
        const book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
        if(isInLibrary(book)) {
            error.textContent = "This book is already in your library";
        }
        else {
            addBookToLibrary(book);
            displayBookInLibrary(book);
            document.querySelector(".popup").style.display = "none";
            reset();
        }
    }
    else {
        error.textContent = "Fill out all fields, input must be valid";
    }
    remove();
});

function reset() {
    title.value = null;
    author.value = null;
    pages.value = null;
    checkbox.checked = false;
    error.textContent = "";
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function isInLibrary(book) {
    return myLibrary.find(item => item.title === book.title) !== undefined;//returns true if not undefined, so book already exists
}

function displayBookInLibrary(book) {

    const bookContainer = document.querySelector("#bookContainer");
        //add book to grid.
        let div = document.createElement("div");
        let hasRead = "";
        let clr = "";
        if(book.read) {
            hasRead = "Read";
            clr ="green";
        }
        else {
            hasRead = "Not read yet";
            clr="red";
        }

        let pluralSingular = "pages";
        if(book.pages < 2) {
            pluralSingular = "page";
        }

        div.setAttribute("data-num", counter);

        div.style.width = "13rem";
        div.style.height = " 13rem";
        div.style.border = " 4px solid #c31";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.gap = "10px";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.textAlign = "center";
        div.style.borderRadius = "5px";
        div.innerHTML = `
        <p class="BookTitle">"${book.title}"</p>

        <p class="BookAuthor">${book.author}</p>

        <p class="BookPages">${book.pages} ${pluralSingular}</p>

        <button style="background: ${clr}; color: white; padding: 5px; border-radius: 4px;" class="HasRead${counter}">${hasRead}</button>

        <button class="Remove">Remove</button>
        `;

        bookContainer.appendChild(div);



        book.dataNum = `${counter}`;
        //add event listener to HasRead button.
        const button = document.querySelector(`.HasRead${counter}`);
        button.addEventListener("click", () => {
            button.textContent = button.textContent === 'Read' ? 'Not read yet' : 'Read';
            button.style.background = button.style.background === 'red' ? 'green' : 'red';
        });

        counter++;
}

function remove() {

    //remove buttons:
    document.querySelectorAll('.Remove').forEach(button => {
        button.addEventListener('click', () => {
            const dataNum = button.parentNode.getAttribute('data-num');
            for(i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].dataNum === dataNum) {
                    const div = document.querySelector(`div[data-num="${dataNum}"]`);
                    div.parentNode.removeChild(div);
                    myLibrary.splice(i, 1);//not ideal, but oh well...
                    break;
                }
            };
        });
    });
}