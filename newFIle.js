const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

const books = [
  {
    id: 1,
    title: "Data Structure",
  },
];

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
const notFound = (res) => {
  res.json({
    message: "Book not found.",
  });
};

app.get("/books", (req, res) => {
  if (books.length > 0) {
    res.json(books);
  } else {
    res.json({
      message: "No books to show at the moment. Please try again later.",
    });
  }
});

app.get("/books/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = findBook(bookId);

  if (book) {
    res.json(book);
  } else {
    notFound(res);
  }
});

app.post("/books", (req, res) => {
  const book = req.body;

  book.id = books.length + 1;

  books.push(book);

  res.json({
    message: `Book ${book.title} added successfully.`,
  });
});

app.patch("/books/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = findBook(bookId);
  const newBook = req.body;
  if (book) {
    books[bookId] = newBook;
    books[bookId].id = bookId + 1;
    res.json({
      message: `Book ${newBook.title} updated successfully.`,
      data: newBook,
    });
  } else {
    notFound(res);
  }
});

app.delete("/books/:bookId", (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = findBook(bookId);

  if (book) {
    books.splice(bookId, 1);
    res.json({
      message: `Book ${book.title} has been deleted successfully.`,
    });
  } else {
    notFound(res);
  }
});
