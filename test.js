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
  console.log(`Listening at: http://localhost:${port}`);
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

app.get("/books", (req, res) => {
  if (books.length > 0) {
    res.json(books);
  } else {
    res.json({
      message: "No books found at the moment.",
    });
  }
});

app.get("/books/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = findBook(bookId);

  if (book) {
    res.json(book);
  } else {
    res.json({
      message: "Book not found",
    });
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
    res.json({
      message: "Book not found.",
    });
  }
});

app.delete("/books/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = findBook(bookId);
  if (book) {
    books.splice(bookId, 1);
    res.json({
      message: `Book ${book.title} deleted successfully.`,
    });
  } else {
    res.json({
      message: "Book not found. ",
    });
  }
});
