var model = require("../models/index");
const express = require("express");


module.exports = function(app){
const { check, validationResult } = require('express-validator');
app.post("/books", [ 
    check('title').isLength({min:5}),
    check('author').isLength({ max:10}),
    check('page'),
    check('languages'),
    check('publisher_id')],
    function(req,res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({
                data: [],
                message: "GAGAL!"
            })
        }
    const { title, author, publised_date, pages, language, publiser_id} = req.body;
    model.book.create({
        title: title,
        author: author,
        page: pages,
        languages: language,
        publiser_id: publiser_id
    })
    .then(books => res.status(201).json({
        data: books,
        massage: "has been created"
    }))
    .catch(error => res.status(500).json({
        data: [],
        error: error
    })
    );
    });
    app.get("/books", function(req,res){
        model.book.findAll({})
        .then(books => res.status(201).json({
            data: books
        }))
        .catch(error=> res.status(500).json({
            data: [],
            error: error
        }))
    });
    app.put("/books/:id", function(res,req){
        const book_id = req.params.id;
        const { id, title, author, publised_date, pages, language, publised_id} = req.body;
        model.book.update(
            {
            id : id,
            title: title,
            author: author,
            publised_date: publised_date,
            pages: pages,
            language: language,
            publised_id: publised_id
            },
            {
                where: {
                    id: book_id
                }
            }
        )
        .then(books => res.status(201).json({
            data: books,
            massage: "book has been update"
        }))
        .catch(error => res.status(500).json({
            error: error
        }))
    });
    app.delete("/books/:id",function(req,res){
        const book_id = req.params.id;
        model.book.destroy({
            where:{
                id: book_id
            }
        })
        .then(status => res.status(201).json({
            message: "book has been delete"
        }))
        .catch(error => res.status(500).json({
            error:error
        }))
    })
}