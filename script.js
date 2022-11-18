let myLibrary = [0];
var addBookCard = document.querySelector("#add-book-card");
var addBookButton = document.querySelector("#add-book");
var closeFormButton = document.querySelector("#close-form-button");
var leftButton = document.querySelector("#left-button");
var rightButton = document.querySelector("#right-button");
var deleteButton = document.querySelector("#delete-button");
var bookDisplay = document.querySelector("#book-display");
var bookPrecedence = 0;
var description = document.querySelector("#description");

function Book(title, author, pageCount, isRead, precedence) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
  this.precedence = precedence;
}

function addBookToLibrary() {
  var titleInput = document.querySelector("#form-title").value;
  var authorInput = document.querySelector("#form-author").value;
  var pageCountInput = document.querySelector("#form-pages").value;
  var isReadInput = document.querySelector("#is-read").checked;
  var libraryLength = myLibrary.length;
  const book = new Book(titleInput, authorInput, pageCountInput, isReadInput, libraryLength);
  myLibrary.push(book);
  toggleForm();
  hideAllCards();
  displayAddedBook(myLibrary[book.precedence]);
  return false;
}

toggleForm();
addBookButton.addEventListener("click", toggleForm);
closeFormButton.addEventListener("click", toggleForm);

function toggleForm() {
  var form = document.querySelector("#add-book-form");
  if (form.style.visibility == "hidden"){
    form.style.visibility = "visible";
    addBookButton.style.color = "#764462";
  }
  else{
    form.style.visibility = "hidden";
    addBookButton.style.color = "#edb4a1";
  }
}

function hideAllCards() {
  var cards = document.querySelectorAll(".card");
  cards.forEach(function(element) {
    element.style.visibility = "hidden";
  });
}

function displayAddedBook(selectedBook) {
  const displayedBook = document.createElement("div");
  console.log(selectedBook.precedence);
  var bookPrecedence = selectedBook.precedence;
  displayedBook.innerText = myLibrary[bookPrecedence].title;
  displayedBook.classList.add("book-card");
  displayedBook.classList.add("card");
  displayedBook.setAttribute("id", "book" + bookPrecedence.toString())
  bookDisplay.appendChild(displayedBook);
  updateDescription(selectedBook);
  deleteButton.style.visibility = "visible"
  //to initialize buttons and prevent wrongful calling of an element as 0 while updating description.
  leftButtonClick();
  console.log(myLibrary);
}

//start of pseudo-carousel

var displayIndex = bookPrecedence;

rightButton.addEventListener("click", rightButtonClick);

function rightButtonClick(){
  displayIndex++;
  if (displayIndex > myLibrary.length-1) {
    displayIndex = 0;
  }
  hideAllCards();
  updateDescription(myLibrary[displayIndex]);
  if (displayIndex == 0) {
    addBookCard.style.visibility = "visible";
    deleteButton.style.visibility = "hidden";
  }
  else {
    document.querySelector("#book" + displayIndex.toString()).style.visibility = "visible";
    deleteButton.style.visibility = "visible";
  }
}

leftButton.addEventListener("click", leftButtonClick);

function leftButtonClick(){
  displayIndex--;
  if (displayIndex < 0) {
    displayIndex = myLibrary.length-1;
  }
  hideAllCards();
  updateDescription(myLibrary[displayIndex]);
  if (displayIndex == 0) {
    addBookCard.style.visibility = "visible";
    deleteButton.style.visibility = "hidden";
  }
  else {
    document.querySelector("#book" + displayIndex.toString()).style.visibility = "visible";
    deleteButton.style.visibility = "visible";
  }
}

function updateDescription(element) {
  const statusChanger = document.createElement("span");
  statusChanger.id = "status-changer";
  if (element == myLibrary[0]){
    description.innerHTML = "Add book?";
  }
  else {
    description.innerHTML = "The title of this book is " + element.title +". It has " + element.pageCount + " pages and is written by " + element. author + ". ";
    if (element.isRead){
      statusChanger.textContent = "You have already read it.";
      description.appendChild(statusChanger);
    }
    else {
      statusChanger.textContent = "You still haven't read it."
      description.appendChild(statusChanger);
    }
  }
  rightButton.style.visibility = "visible";
  leftButton.style.visibility = "visible";
}

document.addEventListener("click", changeStatus);

function changeStatus(event) {
  if (event.target == document.querySelector("#status-changer")){
    if (myLibrary[displayIndex].isRead) {
      myLibrary[displayIndex].isRead = false;
      updateDescription(myLibrary[displayIndex]);
    }
    else {
      myLibrary[displayIndex].isRead = true;
      updateDescription(myLibrary[displayIndex]);
    }
  }
}

deleteButton.addEventListener("click", deleteBook);

function deleteBook() {
  myLibrary.splice(displayIndex, 1);
  document.querySelector("#book" + displayIndex.toString()).remove();
  leftButtonClick();
  fixPrecedence();
  console.log(myLibrary);
}

function fixPrecedence() {
  var cards = document.querySelectorAll(".book-card");
  var i = 1;
  cards.forEach(element => {
    if (element.id != "book" + i.toString()){
      element.id = "book" + i.toString();
    }
    i++;
  });
}