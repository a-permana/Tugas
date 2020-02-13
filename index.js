const express = require("express");
const PORT = 3005;
const ADDRESS = "localhost";
const Mongoose = require("mongoose");
const app = express();

app.use(express.json());
require("./tugassatu/books.js")(app);

Mongoose.connect("mongodb://localhost/express_mongoose");

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://${ADDRESS}:${PORT}`);
});