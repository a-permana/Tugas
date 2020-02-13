var model = require("../models/index");
module.exports = function(app) {
/* GET todo listing. */
app.get("/todos", function(req, res, next) {
model.Todo.findAll({})
.then(todos =>
res.json({
error: false,
data: todos
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
model.Todo.create({
title: title,
description: description
})
.then(todo =>
res.status(201).json({
error: false,
data: todo,
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
app.put("/todos/:id", function(req, res, next) {
const todo_id = req.params.id;
const { title, description } = req.body;
model.Todo.update(
{
title: title,
description: description
},
{
where: {
id: todo_id
}
}
)
.then(todo =>
    res.json({
    error: false,
    message: "todo has been updated."
    })
    )
    .catch(error =>
    res.json({
    error: true,
    error: error
    })
    );
    });
    /* GET todo listing. */
    /* Delete todo. */
    app.delete("todos/:id", function(req, res, next) {
    const todo_id = req.params.id;
    model.Todo.destroy({
    where: {
    id: todo_id
    }
    })
    .then(status =>
    res.json({
    error: false,
    message: "todo has been delete."
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