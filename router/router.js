module.exports = function(app) {
  const verifySignUp = require("./verifySignUp");
  const authJwt = require("./verifyJwtToken");
  const authController = require("../controller/authController.js");
  const userController = require("../controller/userController.js");
  const orderController = require("../controller/orderController.js");
  const db = require("../app/db");
  const Book = db.book;
  const express = require("express");

  app.use(express.json());

  // Auth
  app.post("/api/signup",[verifySignUp.checkDuplicateUserNameOrEmail,verifySignUp.checkRolesExisted],authController.signup);
  app.post("/api/signin", authController.signin);
  // get all user
  app.get("/api/users", [authJwt.verifyToken], userController.users);

  app.post("/books",[authJwt.verifyToken, authJwt.isAdmin],orderController.addBook);

  app.get("/books", [authJwt.verifyToken], orderController.tampilsemuaBuku);

  app.get("/books/:id", [authJwt.verifyToken], orderController.tampilBuku);

  app.put("/books/:id", [authJwt.verifyToken], orderController.rubahBuku);

  app.delete("/books/:id", [authJwt.verifyToken], orderController.hapusBuku);

  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);

  app.get("/orders", [authJwt.verifyToken], orderController.liatsemuaOrder);

  app.get("/orders/:id", [authJwt.verifyToken], orderController.liatOrder);

  app.post("/orders/:id", [authJwt.verifyToken], orderController.buatOrder);

  app.get("/api/test/pm",[authJwt.verifyToken, authJwt.isPmOrAdmin],userController.managementBoard);

  app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],userController.adminBoard);
  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });
  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};