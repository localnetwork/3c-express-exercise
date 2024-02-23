const express = require("express");
const port = 3000;
const app = express();
const books = [
  {
    id: 1,
    title: "Data Structure",
  },
];

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening to: http://localhost:${port}`);
});

app.get("/books", (req, res) => {
  if (books.length > 0) {
    res.json(books);
  } else {
    res.json({
      message: "No books found.",
    });
  }
});

const findBook = (bookId) => {
  for (i = 0; i <= books.length; i++) {
    switch (bookId) {
      case i:
        return books[i];
        break;
      default:
        break;
    }
  }
  return false;
};

const bookNotFound = (res) => {
  res.json({
    message: "Book not found.",
  });
};

app.get("/books/:bookId", (req, res) => {
  const book = findBook(parseInt(req.params.bookId));

  if (book) {
    res.json(book);
  } else {
    bookNotFound(res);
  }
});

app.post("/books", (req, res) => {
  const book = req.body;
  book.id = books.length + 1;
  books.push(book);
  res.json(book);
});

app.patch("/books/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = findBook(bookId);

  if (book) {
    const newBook = req.body;
    newBook.id = bookId + 1;

    books[bookId] = newBook;
    res.json(newBook);
  } else {
    bookNotFound(res);
  }
});

app.delete("/books/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);

  const book = findBook(bookId);

  if (book) {
    books.splice(bookId, 1);
    res.json({
      message: `${book.title} deleted successfully.`,
    });
  } else {
    bookNotFound(res);
  }
});
