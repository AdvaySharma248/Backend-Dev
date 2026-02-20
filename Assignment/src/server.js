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

function validateYearValue(yearValue) {
  if (yearValue === undefined || yearValue === null || yearValue === "") {
    return { valid: false, message: "year is required" };
  }

  const numericYear = Number(yearValue);
  if (!Number.isInteger(numericYear)) {
    return { valid: false, message: "year must be a valid integer number" };
  }

  if (numericYear < MIN_YEAR || numericYear > MAX_YEAR) {
    return {
      valid: false,
      message: `year must be between ${MIN_YEAR} and ${MAX_YEAR}`
    };
  }

  return { valid: true, year: numericYear };
}

function validateBookYear(req, res, next) {
  // Exercise 2: Implement input validation middleware that checks if the year is a valid number and within a reasonable range.
  if (req.method === "PUT" && req.body.year === undefined) {
    return next();
  }

  const result = validateYearValue(req.body.year);
  if (!result.valid) {
    return res.status(400).json({ message: result.message });
  }

  req.body.year = result.year;
  return next();
}

function validateBookPayload(req, res, next) {
  const { title, author } = req.body;
  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ message: "title is required and must be a string" });
  }

  if (!author || typeof author !== "string") {
    return res
      .status(400)
      .json({ message: "author is required and must be a string" });
  }

  return next();
}

function validatePagination(req, res, next) {
  const { page, limit } = req.query;

  if (page !== undefined) {
    const parsedPage = Number(page);
    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      return res
        .status(400)
        .json({ message: "page must be a positive integer" });
    }
  }

  if (limit !== undefined) {
    const parsedLimit = Number(limit);
    if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
      return res
        .status(400)
        .json({ message: "limit must be a positive integer" });
    }
  }

  return next();
}

function validateYearFilter(req, res, next) {
  if (req.query.year === undefined) {
    return next();
  }

  const result = validateYearValue(req.query.year);
  if (!result.valid) {
    return res.status(400).json({ message: result.message });
  }

  req.query.year = String(result.year);
  return next();
}

app.get("/", (_req, res) => {
  res.json({ message: "Books & Authors API is running" });
});

app.get("/books/search", (req, res) => {
  // Exercise 5: Add a search endpoint that allows searching books by title using a query parameter.
  const { title } = req.query;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ message: "title query parameter is required for search" });
  }

  const matchedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  return res.json({
    query: title,
    totalResults: matchedBooks.length,
    data: matchedBooks
  });
});

app.get("/books", validateYearFilter, validatePagination, (req, res) => {
  // Exercise 1: Add query parameter filtering to the GET all books endpoint to filter by author or year.
  // Exercise 3: Add pagination to the GET all books endpoint using query parameters like ?page=1&limit=10.
  const { author, year } = req.query;

  let filteredBooks = [...books];

  if (author) {
    filteredBooks = filteredBooks.filter((book) =>
      book.author.toLowerCase().includes(String(author).toLowerCase())
    );
  }

  if (year) {
    filteredBooks = filteredBooks.filter((book) => book.year === Number(year));
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
  const totalItems = filteredBooks.length;
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / limit);

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

app.get("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find((item) => item.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json(book);
});

app.post("/books", validateBookPayload, validateBookYear, (req, res) => {
  const newBook = {
    id: nextBookId++,
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    year: req.body.year
  };

  books.push(newBook);
  return res.status(201).json(newBook);
});

app.put("/books/:id", validateBookPayload, validateBookYear, (req, res) => {
  const bookId = Number(req.params.id);
  const index = books.findIndex((item) => item.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[index] = {
    ...books[index],
    title: req.body.title.trim(),
    author: req.body.author.trim(),
    year: req.body.year ?? books[index].year
  };

  return res.json(books[index]);
});

app.delete("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const index = books.findIndex((item) => item.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books[index];
  books = books.filter((item) => item.id !== bookId);

  return res.json({
    message: "Book deleted successfully",
    deletedBook
  });
});

// Exercise 4: Create a new resource (authors) and implement full CRUD operations for it.
app.get("/authors", (_req, res) => {
  res.json(authors);
});

app.get("/authors/:id", (req, res) => {
  const authorId = Number(req.params.id);
  const author = authors.find((item) => item.id === authorId);

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  return res.json(author);
});

app.post("/authors", (req, res) => {
  const { name, country } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ message: "name is required and must be a string" });
  }

  if (country !== undefined && typeof country !== "string") {
    return res.status(400).json({ message: "country must be a string" });
  }

  const newAuthor = {
    id: nextAuthorId++,
    name: name.trim(),
    country: country ? country.trim() : ""
  };

  authors.push(newAuthor);
  return res.status(201).json(newAuthor);
});

app.put("/authors/:id", (req, res) => {
  const authorId = Number(req.params.id);
  const index = authors.findIndex((item) => item.id === authorId);

  if (index === -1) {
    return res.status(404).json({ message: "Author not found" });
  }

  const { name, country } = req.body;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ message: "name is required and must be a string" });
  }

  if (country !== undefined && typeof country !== "string") {
    return res.status(400).json({ message: "country must be a string" });
  }

  authors[index] = {
    ...authors[index],
    name: name.trim(),
    country: country ? country.trim() : ""
  };

  return res.json(authors[index]);
});

app.delete("/authors/:id", (req, res) => {
  const authorId = Number(req.params.id);
  const index = authors.findIndex((item) => item.id === authorId);

  if (index === -1) {
    return res.status(404).json({ message: "Author not found" });
  }

  const deletedAuthor = authors[index];
  authors = authors.filter((item) => item.id !== authorId);

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
