let myLibrary = [0];
var addBookCard = document.querySelector("#add-book-card");
var addBookButton = document.querySelector("#add-book");
var addBookForm = document.querySelector("add-book-form");
var closeFormButton = document.querySelector("#close-form-button");
var leftButton = document.querySelector("#left-button");
var rightButton = document.querySelector("#right-button");
var bookDisplay = document.querySelector("#book-display");
var bookPrecedence = 0;
var description = document.querySelector("#description");

function Book(title, author, pageCount, isRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
}

function addBookToLibrary() {
  var titleInput = document.querySelector("#form-title").value;
  var authorInput = document.querySelector("#form-author").value;
  var pageCountInput = document.querySelector("#form-pages").value;
  var isReadInput = document.querySelector("#is-read").checked;
  const book = new Book(titleInput, authorInput, pageCountInput, isReadInput);
  myLibrary.push(book);
  toggleForm();
  hideAllCards();
  displayAddedBook(myLibrary[myLibrary.length-1]);
  return false;
}

addBookButton.addEventListener("click", toggleForm);
closeFormButton.addEventListener("click", toggleForm);

function toggleForm() {
  var form = document.querySelector("#add-book-form");
  if (form.style.visibility == "hidden"){
    form.style.visibility = "visible";
    addBookButton.style.color = "#764462";
    leftButton.style.visibility = "hidden";
    rightButton.style.visibility = "hidden";
  }
  else {
    form.style.visibility = "hidden"
    addBookButton.style.color = "#edb4a1";
    leftButton.style.visibility = "visible";
    rightButton.style.visibility = "visible";
  }
}

function hideAllCards() {
  var cards = document.querySelectorAll(".card");
  cards.forEach(function(element) {
    element.style.visibility = "hidden";
  })
}

function displayAddedBook(selectedBook) {
  const displayedBook = document.createElement("div");
  var bookPrecedence = myLibrary.length-1;
  displayedBook.innerText = selectedBook.title;
  displayedBook.classList.add("book-card");
  displayedBook.classList.add("card");
  displayedBook.setAttribute("id", "book" + bookPrecedence.toString())
  
  bookDisplay.appendChild(displayedBook);
  updateDescription(selectedBook);
  console.log(displayedBook);
}

//start of pseudo-carousel

var displayIndex = bookPrecedence;

rightButton.addEventListener("click", function(){
  displayIndex++;
  if (displayIndex > myLibrary.length-1) {
    displayIndex = 0;
  }
  hideAllCards();
  updateDescription(myLibrary[displayIndex]);
  if (displayIndex == 0) {
    addBookCard.style.visibility = "visible";
  }
  else {
    document.querySelector("#book" + displayIndex.toString()).style.visibility = "visible";
  }
});

leftButton.addEventListener("click", function(){
  displayIndex--;
  if (displayIndex < 0) {
    displayIndex = myLibrary.length-1;
  }
  hideAllCards();
  updateDescription(myLibrary[displayIndex]);
  if (displayIndex == 0) {
    addBookCard.style.visibility = "visible";
  }
  else {
    document.querySelector("#book" + displayIndex.toString()).style.visibility = "visible";
  }
});

function updateDescription(element) {
  if (element == 0){
    description.innerHTML = "Add book?";
  }
  else {
    description.innerHTML = "The title of this book is " + element.title +". It has " + element.pageCount + " pages and is written by " + element. author + ". ";
    if (element.isRead){
      description.innerHTML += "You have already read it."
    }
    else {
      description.innerHTML += "You still haven't read it."
    }
  }
}