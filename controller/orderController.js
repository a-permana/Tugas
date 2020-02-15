const db = require("../app/db.js");
const Book = db.book;
const User = db.user;
const asyncMiddleware = require("express-async-handler");

exports.addBook = asyncMiddleware(async (req, res) => {
  console.log("Processing func -> Tambah Buku");
  const {
    title,
    author,
    pages,
    language,
    publisher_id
  } = req.body;
  db.book
    .create({
      title: title,
      author: author,
      pages: pages,
      language: language,
      publisher_id: publisher_id
    })
    .then(book =>
      res.status(201).json({
        error: false,
        data: book,
        message: "book added successfully."
      })
    )
    .catch(error =>
      res.json({
        error: true,
        data: [],
        error: error
      })
    );
});

exports.rubahBuku = asyncMiddleware(async (req, res) => {
  await Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      language: req.body.language,
      publisher_id: req.body.publisher_id
    },
    { where: { id: req.params.id } }
  );
  res.status(201).send({
    status: "book updated successfully."
  });
});

//show book by id
exports.tampilBuku = asyncMiddleware(async (req, res) => {
  const book = await Book.findOne({
    where: { id: req.params.id },
    attributes: [
      "title",
      "author",
      "pages",
      "language",
      "publisher_id"
    ]
  });

  res.status(200).json({
    description: "appeared book",
    book: book
  });
});

exports.tampilsemuaBuku = asyncMiddleware(async (req, res) => {
  const book = await Book.findAll({
    attributes: [
      "title",
      "author",
      "pages",
      "language",
      "publisher_id"
    ]
  });
  res.status(200).json({
    description: "all books appear",
    book: book
  });
});

exports.hapusBuku = asyncMiddleware(async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.status(201).send({
    status: "book successfully deleted."
  });
});

exports.buatOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId }
  });
  const books = await Book.findOne({
    where: { id: req.params.id }
  });
  await user.addBooks(books);
  res.status(201).send({
    user: user,
    books: books,
    status: "order succeeded!"
  });
});

exports.liatsemuaOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "title",
          "author",
          "pages",
          "language",
          "publisher_id"
        ],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "All Order",
    user: user
  });
});

exports.liatOrder = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Book,
        attributes: [
          "title",
          "author",
          "pages",
          "language",
          "publisher_id"
        ],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  console.log("tes eror");
  res.status(200).json({
    description: "User order page",
    user: user
  });
});