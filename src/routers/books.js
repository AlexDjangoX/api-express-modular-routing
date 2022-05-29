// Import data here...
const express = require("express");
const router = express.Router();
let { books } = require("../../data.js");

// Write routes here...

router.get("/", (req, res) => {
  res.json({ books });
});
router.get("/", (req, res) => {
  res.json({ books });
});
router.get("/:id", (req, res) => {
  const book = books.find((book) => book.id === +req.params.id);
  res.json({ book });
});

router.post("/", (req, res) => {
  const keys = ["title", "author", "type"];
  const resKeys = Object.keys(req.body);

  const missing = keys.filter((key) => {
    if (resKeys.some((resKey) => resKey === key)) return false;
    return true;
  });
  if (missing.length > 0) {
    return res.status(400).json({
      error: `Missing field ${missing}`,
    });
  }

  const book = books.find((book) => req.body.title === book.title);
  if (book) {
    return res.status(409).json({
      error: `A book with title '${req.body.title}' already exists`,
    });
  }

  const id = books.length + 1;
  books.push({ ...req.body, id: id });
  res.json({ book: { ...req.body, id: id } });
});

router.delete("/:id", (req, res) => {
  const book = books.find((book) => book.id === +req.params.id);
  books = books.filter((book) => book.id !== +req.params.id);
  res.json({ book });
});

router.put("/:id", (req, res) => {
  let foundIndex = books.findIndex((book) => book.id === +req.params.id);
  books[foundIndex] = { ...req.body, id: +req.params.id };
  res.json({ ...books[foundIndex] });
});

router.patch("/:id", (req, res) => {
  const [key] = Object.keys(req.body);
  let foundIndex = books.findIndex((book) => book.id === +req.params.id);
  books[foundIndex][key] = req.body[key];
  res.json({ ...books[foundIndex] });
});

module.exports = router;
