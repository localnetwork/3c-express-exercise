const express = require("express");

const app = express();
const port = 3000;

const books = [
  {
    id: 1,
    title: "Data Structure",
  },
];

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});

app.get("/books", (req, res) => {
  res.json(books);
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

  try {
    books.push(book);
    res.json(book);
  } catch (error) {
    console.error("Error creating book", error);
  }
});
