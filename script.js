let myLibrary = [];
var addBookButton = document.querySelector("#add-book");
var closeFormButton = document.querySelector("#close-form-button");

var titleInput = document.querySelector("#form-title").value;
var authorInput = document.querySelector("#form-author").value;
var pageCountInput = document.querySelector("#form-pages").value;
var isReadInput = document.querySelector("#is-read").value;

function Book(title, author, pageCount, isRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = isRead;
}

function addBookToLibrary() {
  const book = new Book(titleInput, authorInput, pageCountInput, isReadInput);
  myLibrary.push(book);
}

addBookButton.addEventListener("click", toggleForm);
closeFormButton.addEventListener("click", toggleForm);

function toggleForm() {
  var form = document.querySelector("#add-book-form");
  if (form.style.visibility == "hidden"){
    form.style.visibility = "visible";
    addBookButton.style.color = "#764462";
  }
  else {
    form.style.visibility = "hidden"
    addBookButton.style.color = "#edb4a1";
  }
}