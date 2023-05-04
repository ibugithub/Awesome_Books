class Books {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(title, author) {
    const book = { title, author, id: Date.now() };
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeBook(id) {
    const index = this.books.findIndex((book) => book.id === Number(id));
    if (index !== -1) {
      this.books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }

  displayBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const bookList = document.getElementById('book-list');
    console.log('list section will be shown');
    bookList.innerHTML = '';
    books.forEach((book) => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book');
      bookItem.innerHTML = `${book.title} by ${book.author}<button class="remove-title" data-id="${book.id}">Remove</button>`;
      bookList.appendChild(bookItem);

      const removeButton = bookItem.querySelector('.remove-title');
      removeButton.addEventListener('click', (event) => {
        const { id } = event.target.dataset;
        this.removeBook(id);
        this.displayBooks();
      });
    });
  }

  static showAddBookSection() {
    console.log('AddBook section will be shown');
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = ` 
    <div id="contact_section">

    <div class="contact_title">
      <h2>Contact Information</h2>
    </div>

    <div class="contact_detail">
      <div class="contact_description">
        <p>Do have any questions or you just want say "Hello"? You can reach out to us</p>
      </div>

      <ul class="address">
        <li>Our e-mail: mail@mail.com</li>
        <li>Our Phone: number +8801952773973</li>
        <li>Our address: Streetname 22,84503 City, Country</li>
      </ul>
    </div>

  </div>
    `;
  }

  static showContactSection() {
    console.log('Contact section will be shown');
  }
}

const books = new Books();
books.displayBooks();

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  books.addBook(title, author);
  books.displayBooks();
  addBookForm.reset();
});

const bookList = document.getElementById('book-list');
bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-title')) {
    const { id } = event.target.dataset;
    books.removeBook(id);
    books.displayBooks();
  }
});

document.querySelector('#list').addEventListener('click', books.displayBooks);
document.querySelector('#add_new').addEventListener('click', Books.showAddBookSection);
document.querySelector('#contact').addEventListener('click', Books.showContactSection);
