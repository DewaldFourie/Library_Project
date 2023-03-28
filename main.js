
/**
library project with javascript and html, adding books to a library array and creating cards to display book.
 also add a delete function that when this button is pressed the 
 card and the object in the library array will be deleted  */


// Array containing all the books and it's values in the library
let myLibrary = [];


// Book Constructor 
function Book(title, author, num_pages, have_read){
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.have_read = have_read;
}


// MAnually adding 3 books for Testing Purposes
const book1 = new Book("ABO in Color", "Tinus Le Roux", 300, false)
const book2 = new Book("Rich Dad, Poor Dad", "Robert T. Kiyosaki", 282, true )
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", 365, false)
myLibrary.push(book1, book2, book3);

// Function to create new book object and push to library
function addBookToLibrary(title, author, num_pages, have_read){
    let newBook = new Book(title, author, num_pages, have_read)
    myLibrary.push(newBook);
    console.log(newBook);
}


// Function to add book when event "submit" is clicked
function addBook () {
    // getting the form and submit buttons
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('.submit-btn');

    // Function when the sbmit button is clicked
    submitBtn.addEventListener('click', function(event){
        // to prevent button from going to server
        event.preventDefault();
        // to clear the book container to prevent duplicates
        const bookContainer = document.querySelector('#card-container');
        bookContainer.textContent = ''
        // getting the values of the user inputs
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const num_pages = document.querySelector('#num_pages').value;
        const have_read = document.querySelector('input[name="have-read-book"]:checked').value;
        // checking if have read is true or false from RadioButton
        function haveRead(have_read){
            if (have_read === 'true') {
                return true
            }
            else {
                return false
            }
        }
        // Creating a new book Object from user input data
        addBookToLibrary(title, author, num_pages, haveRead(have_read))
        
    
        // Function to display books on page from Library: with new book added
        displayBooks();

        console.log(myLibrary)
        // reset the form to blank
        form.reset();
        
    });
}


// Function  to Delete a book from library and cardContainer
function deleteBook(deleteButton, library, i){
    deleteButton.addEventListener("click", () => {
        library.splice(i, 1);
        displayBooks();
        console.log(library)
    })
}


// Function to display books on the page from library
function displayBooks(){
    // getting the container
    const bookContainer = document.querySelector('#card-container');
    bookContainer.innerHTML = "";
    // creating a card with title, author, num pages and have read attributes.
    for (let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card'); 

        let title = document.createElement('h2');
        title.textContent = myLibrary[i].title;
        title.classList.add('card-text')
        
        let author = document.createElement('h3');
        author.textContent = myLibrary[i].author;
        author.classList.add('card-text')

        let num_pages = document.createElement('h4');
        num_pages.textContent = myLibrary[i].num_pages + " pages";
        num_pages.classList.add('card-text')

        let readBtn = document.createElement('button');
        readBtn.classList.add('readBtn');
        readBtn.classList.add('card-text')
        if (myLibrary[i].have_read === true ){
            readBtn.classList.add('have-read')
            readBtn.textContent = 'Read'
        }
        else {
            readBtn.classList.add('have-not-read')
            readBtn.textContent = 'Not Read' 
        }
        readBtn.addEventListener("click", () => {
           if (readBtn.classList.contains('have-read')){
            readBtn.classList.remove('have-read')
            readBtn.classList.add('have-not-read')
            readBtn.textContent = 'Not Read'
           }
           else {
            readBtn.classList.remove('have-not-read')
            readBtn.classList.add('have-read')
            readBtn.textContent = 'Read'
           }
        })

        let readBtnInfo = document.createElement('p');
        readBtnInfo.classList.add("readBtnInfo");
        readBtnInfo.textContent = 'Tap to Change';
        readBtnInfo.classList.add('card-text')


        // Creating div for btns Container
        let btnsContainer = document.createElement('div');
        btnsContainer.classList.add('btnsContainer');

        // Creating the buttons on each card
        let favBtn = document.createElement('button');
        favBtn.classList.add('cardBtns');
        
        let shareBtn = document.createElement('button');
        shareBtn.classList.add('cardBtns');

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('cardBtns');
        deleteBook(deleteBtn, myLibrary, i);


        // Creating images for buttons
        let favImg = document.createElement('img');
        favImg.src='icons/favourite.png'
        favImg.alt='fav image'
        favImg.classList.add('cardIcons')

        let shareImg = document.createElement('img');
        shareImg.src='icons/share2.png'
        shareImg.alt='Share image'
        shareImg.classList.add('cardIcons')

        let deleteImg = document.createElement('img');
        deleteImg.src='icons/delete.png';
        deleteImg.alt='delete img';
        deleteImg.classList.add('cardIcons');


        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(num_pages);
        card.appendChild(readBtn);
        card.appendChild(readBtnInfo);
        card.appendChild(btnsContainer);
        btnsContainer.appendChild(favBtn);
        btnsContainer.appendChild(shareBtn);
        btnsContainer.appendChild(deleteBtn);
        favBtn.appendChild(favImg);
        shareBtn.appendChild(shareImg);
        deleteBtn.appendChild(deleteImg);

        bookContainer.appendChild(card);

    };
}

// Run the display function to display books
displayBooks();
addBook();




 



