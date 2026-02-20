const express = require("express");

const app = express();
app.use(express.json());

const MIN_YEAR = 1450;
const MAX_YEAR = new Date().getFullYear() + 1;

let nextBookId = 6;
let nextAuthorId = 4;

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
  { id: 2, title: "1984", author: "George Orwell", year: 1949 },
  { id: 3, title: "Sapiens", author: "Yuval Noah Harari", year: 2011 },
  { id: 4, title: "Ikigai", author: "Hector Garcia", year: 2016 },
  { id: 5, title: "Animal Farm", author: "George Orwell", year: 1945 }
];

let authors = [
  { id: 1, name: "Paulo Coelho", country: "Brazil" },
  { id: 2, name: "George Orwell", country: "United Kingdom" },
  { id: 3, name: "Yuval Noah Harari", country: "Israel" }
];

function validateBookPayload(req, res, next) {
  if (typeof req.body.title !== "string" || req.body.title.trim() === "") {
    return res
      .status(400)
      .json({ message: "title is required and must be a string" });
  }

  if (typeof req.body.author !== "string" || req.body.author.trim() === "") {
    return res
      .status(400)
      .json({ message: "author is required and must be a string" });
  }

  next();
}

function validateBookYear(req, res, next) {
  if (req.method === "PUT" && req.body.year === undefined) {
    return next();
  }

  if (req.body.year === undefined || req.body.year === null || req.body.year === "") {
    return res.status(400).json({ message: "year is required" });
  }

  const yearNumber = Number(req.body.year);

  if (!Number.isInteger(yearNumber)) {
    return res
      .status(400)
      .json({ message: "year must be a valid integer number" });
  }

  if (yearNumber < MIN_YEAR || yearNumber > MAX_YEAR) {
    return res.status(400).json({
      message: `year must be between ${MIN_YEAR} and ${MAX_YEAR}`
    });
  }

  req.body.year = yearNumber;
  next();
}

function validatePagination(req, res, next) {
  if (req.query.page !== undefined) {
    const page = Number(req.query.page);
    if (!Number.isInteger(page) || page < 1) {
      return res
        .status(400)
        .json({ message: "page must be a positive integer" });
    }
  }

  if (req.query.limit !== undefined) {
    const limit = Number(req.query.limit);
    if (!Number.isInteger(limit) || limit < 1) {
      return res
        .status(400)
        .json({ message: "limit must be a positive integer" });
    }
  }

  next();
}

function validateYearFilter(req, res, next) {
  if (req.query.year === undefined) {
    return next();
  }

  const yearNumber = Number(req.query.year);

  if (!Number.isInteger(yearNumber)) {
    return res
      .status(400)
      .json({ message: "year must be a valid integer number" });
  }

  if (yearNumber < MIN_YEAR || yearNumber > MAX_YEAR) {
    return res.status(400).json({
      message: `year must be between ${MIN_YEAR} and ${MAX_YEAR}`
    });
  }

  req.query.year = String(yearNumber);
  next();
}

app.get("/", function (_req, res) {
  res.json({ message: "Books & Authors API is running" });
});

app.get("/books/search", function (req, res) {
  // Exercise 5: Add a search endpoint that allows searching books by title using a query parameter.
  const title = req.query.title;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ message: "title query parameter is required for search" });
  }

  const matchedBooks = [];
  for (let i = 0; i < books.length; i += 1) {
    const currentBook = books[i];
    if (currentBook.title.toLowerCase().includes(title.toLowerCase())) {
      matchedBooks.push(currentBook);
    }
  }

  return res.json({
    query: title,
    totalResults: matchedBooks.length,
    data: matchedBooks
  });
});

app.get("/books", validateYearFilter, validatePagination, function (req, res) {
  // Exercise 1: Add query parameter filtering to the GET all books endpoint to filter by author or year.
  // Exercise 3: Add pagination to the GET all books endpoint using query parameters like ?page=1&limit=10.
  const author = req.query.author;
  const year = req.query.year;

  const filteredBooks = [];

  for (let i = 0; i < books.length; i += 1) {
    const currentBook = books[i];
    let canAdd = true;

    if (author) {
      const searchAuthor = String(author).toLowerCase();
      if (!currentBook.author.toLowerCase().includes(searchAuthor)) {
        canAdd = false;
      }
    }

    if (year && currentBook.year !== Number(year)) {
      canAdd = false;
    }

    if (canAdd) {
      filteredBooks.push(currentBook);
    }
  }

  let page = 1;
  let limit = 10;

  if (req.query.page !== undefined) {
    page = Number(req.query.page);
  }

  if (req.query.limit !== undefined) {
    limit = Number(req.query.limit);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
  const totalItems = filteredBooks.length;
  let totalPages = 0;

  if (totalItems > 0) {
    totalPages = Math.ceil(totalItems / limit);
  }

  return res.json({
    filters: { author: author || null, year: year ? Number(year) : null },
    pagination: {
      currentPage: page,
      limit,
      totalItems,
      totalPages
    },
    data: paginatedBooks
  });
});

app.get("/books/:id", function (req, res) {
  const bookId = Number(req.params.id);
  let book = null;

  for (let i = 0; i < books.length; i += 1) {
    if (books[i].id === bookId) {
      book = books[i];
      break;
    }
  }

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json(book);
});

app.post("/books", validateBookPayload, validateBookYear, function (req, res) {
  const newBook = {
    id: nextBookId,
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    year: req.body.year
  };

  nextBookId += 1;
  books.push(newBook);
  return res.status(201).json(newBook);
});

app.put("/books/:id", validateBookPayload, validateBookYear, function (req, res) {
  const bookId = Number(req.params.id);
  let index = -1;

  for (let i = 0; i < books.length; i += 1) {
    if (books[i].id === bookId) {
      index = i;
      break;
    }
  }

  if (index < 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[index].title = req.body.title.trim();
  books[index].author = req.body.author.trim();

  if (req.body.year !== undefined) {
    books[index].year = req.body.year;
  }

  return res.json(books[index]);
});

app.delete("/books/:id", function (req, res) {
  const bookId = Number(req.params.id);
  let index = -1;

  for (let i = 0; i < books.length; i += 1) {
    if (books[i].id === bookId) {
      index = i;
      break;
    }
  }

  if (index < 0) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books[index];
  books.splice(index, 1);

  return res.json({
    message: "Book deleted successfully",
    deletedBook
  });
});

// Exercise 4: Create a new resource (authors) and implement full CRUD operations for it.
app.get("/authors", function (_req, res) {
  res.json(authors);
});

app.get("/authors/:id", function (req, res) {
  const authorId = Number(req.params.id);
  let author = null;

  for (let i = 0; i < authors.length; i += 1) {
    if (authors[i].id === authorId) {
      author = authors[i];
      break;
    }
  }

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  return res.json(author);
});

app.post("/authors", function (req, res) {
  const { name, country } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ message: "name is required and must be a string" });
  }

  if (country !== undefined && typeof country !== "string") {
    return res.status(400).json({ message: "country must be a string" });
  }

  const newAuthor = {
    id: nextAuthorId,
    name: name.trim(),
    country: country ? country.trim() : ""
  };

  nextAuthorId += 1;
  authors.push(newAuthor);
  return res.status(201).json(newAuthor);
});

app.put("/authors/:id", function (req, res) {
  const authorId = Number(req.params.id);
  let index = -1;

  for (let i = 0; i < authors.length; i += 1) {
    if (authors[i].id === authorId) {
      index = i;
      break;
    }
  }

  if (index < 0) {
    return res.status(404).json({ message: "Author not found" });
  }

  const { name, country } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ message: "name is required and must be a string" });
  }

  if (country !== undefined && typeof country !== "string") {
    return res.status(400).json({ message: "country must be a string" });
  }

  authors[index].name = name.trim();
  authors[index].country = country ? country.trim() : "";

  return res.json(authors[index]);
});

app.delete("/authors/:id", function (req, res) {
  const authorId = Number(req.params.id);
  let index = -1;

  for (let i = 0; i < authors.length; i += 1) {
    if (authors[i].id === authorId) {
      index = i;
      break;
    }
  }

  if (index < 0) {
    return res.status(404).json({ message: "Author not found" });
  }

  const deletedAuthor = authors[index];
  authors.splice(index, 1);

  return res.json({
    message: "Author deleted successfully",
    deletedAuthor
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
