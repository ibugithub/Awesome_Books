// This function will remove the book from the localstorage
const removeBookFromLocalStorage = (bookId) => {
  let bookListObj = JSON.parse(localStorage.getItem('bookList'));
  bookListObj = bookListObj.filter((obj) => obj.id !== parseInt(bookId, 10));
  localStorage.setItem('bookList', JSON.stringify(bookListObj));
};

// This function will remove the book when remove will be clicked
const removeBook = (event) => {
  const bookNode = event.target.parentNode.parentNode;
  const bookListNode = bookNode.parentNode;
  bookListNode.removeChild(bookNode);
  const bookId = bookNode.id;
  removeBookFromLocalStorage(bookId);
};

// handling remove button click
const removeButtonEvent = () => {
  document.querySelectorAll('.rButton').forEach((element) => {
    element.addEventListener('click', removeBook);
  });
};

// This function is for rendering the book list for the first time
const renderingBookList = () => {
  const bookListObj = JSON.parse(localStorage.getItem('bookList')) || [];
  let count = 0;
  const bookListContainer = document.querySelector('.bookList_container');
  const bookList = document.createElement('div');
  bookList.classList.add('book_list');
  bookListObj.forEach(() => {
    const book = document.createElement('div');
    book.classList.add('book');
    book.id = bookListObj[count].id;
    book.innerHTML = `
      <div class="book_name">
      <h4 class="margin_bottom5">${bookListObj[count].name}</h4>
      </div>
      <div class="book_author">
      <h4 class="margin_bottom5 margin_top0">${bookListObj[count].author}</h4>
      </div>
      <div class="remove_btn">
          <button class="rButton">Remove</button>
      </div>
      <hr>
      `;
    bookList.appendChild(book);
    count += 1;
  });
  bookListContainer.appendChild(bookList);
  removeButtonEvent();
};

// Showing empty input warning
const emptyInputChecker = () => {
  const title = document.querySelector('.bookTitle');
  const author = document.querySelector('.bookAuthor');
  let value = true;
  if (title.value === '') {
    document.querySelector('.titleWarning').textContent = 'you must have a book name';
    value = false;
  } else {
    document.querySelector('.titleWarning').textContent = '';
  }
  if (author.value === '') {
    document.querySelector('.authorWarning').textContent = 'book must have a author name';
    value = false;
  } else {
    document.querySelector('.authorWarning').textContent = '';
  }
  return value;
};

// Removing the old book list
const removeOldBookList = () => {
  const bookListContainer = document.querySelector('.bookList_container');
  const oldBookList = document.querySelector('.book_list');
  bookListContainer.removeChild(oldBookList);
};

// Add books to the localStorage
const addBook = () => {
  const title = document.querySelector('.bookTitle');
  const author = document.querySelector('.bookAuthor');
  const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
  const newBook = { id: bookList.length, name: title.value, author: author.value };
  bookList.push(newBook);
  localStorage.setItem('bookList', JSON.stringify(bookList));
};

// Managing book when new book added or add button click
const manageBook = () => {
  if (emptyInputChecker()) {
    removeOldBookList();
    addBook();
    renderingBookList();
  }
};

document.querySelector('.addButton').addEventListener('click', manageBook);
window.addEventListener('load', renderingBookList);
