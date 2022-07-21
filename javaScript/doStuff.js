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
    let bookRead ;
    if(checkbox.checked) {
        bookRead = Boolean(true);
    }
    else {
        bookRead = Boolean(false);
    }
    if(bookTitle.length > 0 && bookAuthor.length > 0 && bookPages.length > 0) {
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
        error.textContent = "Fill out all fields";
    }
    // changeColor();
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

        <p class="BookPages">${book.pages}${" pages"}</p>

        <button style="background: ${clr}; color: white; padding: 5px; border-radius: 4px;" class="HasRead">${hasRead}</button>

        <button class="Remove">Remove</button>
        `;

        bookContainer.appendChild(div);
        book.dataNum = `${counter}`;

        counter++;
        console.log(book);
                //change color and text of read buttons
                const buttons = document.querySelectorAll(".HasRead").length;

                for(var i = 0; i < buttons; i++) {
        
                    let currentBtn = document.querySelectorAll(".HasRead")[i];
                    currentBtn.addEventListener("click", function() {
                        if(currentBtn.textContent == "Read") {
                            currentBtn.textContent = "Not read yet";
                            currentBtn.style.background = "red";
                            return;
                        }
                        else {
                            currentBtn.textContent = "Read";
                            currentBtn.style.background = "green";
                            return;
                        }
                    })
                }
}

// function changeColor() {
//     //change color and text of read buttons
//     const buttons = document.querySelectorAll(".HasRead").length;

//     for(var i = 0; i < buttons; i++) {

//         let currentBtn = document.querySelectorAll(".HasRead")[i];
//         currentBtn.addEventListener("click", function() {
//             if(currentBtn.textContent == "Read") {
//                 currentBtn.textContent = "Not read yet";
//                 currentBtn.style.background = "red";
//             }
//             else {
//                 currentBtn.textContent = "Read";
//                 currentBtn.style.background = "green";
//             }
//         })
//     }
// }

function remove() {

    
    //remove buttons:
    const buttonsRemove = document.querySelectorAll(".Remove").length;
    console.log(buttonsRemove);
    for(var i = 0; i < buttonsRemove; i++) {
        let currentBtn = document.querySelectorAll(".Remove")[i];
        currentBtn.addEventListener("click", function() {
            //get parent element attribute
            //remove said button from everything
            let parentAttr = currentBtn.parentNode.getAttribute("data-num");
            for(const book of myLibrary) {
                if(book.dataNum == parentAttr) {
                    const index = myLibrary.indexOf(book);
                    const div = document.querySelector(`div[data-num="${parentAttr}"]`);//works
                    document.getElementById("bookContainer").removeChild(div);//also wor
                    myLibrary.splice(index, 1);//remove said book from array, works
                    return;
                }
            }
        });
    }
}