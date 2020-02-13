var model = require("../models/index");
module.exports = function(app) {
/* GET todo listing. */
app.get("/books", function(req, res, next) {
model.book.findAll({})
.then(books =>
res.json({
error: false,
data: books
})
)
.catch(error =>res.json({
error: true,
data: [],
error: error
})
);
});
/* POST todo. */
app.post("/todos", function(req, res, next) {
const { title, description } = req.body;
model.book.create({
title: title,
description: description
})
.then(book =>
res.status(201).json({
error: false,
data: book,
message: "New todo has been created."
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
/* update todo. */
app.put("/books/:id", function(req, res, next) {
const todo_id = req.params.id;
const { title, description } = req.body;
model.book.update(
{
title: title,
description: description
},
{
where: {
id: book_id
}
}
)
.then(book =>
    res.json({
    error: false,
    message: "book has been updated."
    })
    )
    .catch(error =>
    res.json({
    error: true,
    error: error
    })
    );
    });
    /* GET book listing. */
    /* Delete book. */
    app.delete("books/:id", function(req, res, next) {
    const book_id = req.params.id;
    model.book.destroy({
    where: {
    id: book_id
    }
    })
    .then(status =>
    res.json({
    error: false,
    message: "book has been delete."
    })
    )
    .catch(error =>
    res.json({
    error: true,
    error: error
    })
    );
    });
    };