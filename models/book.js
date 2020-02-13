'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    page: DataTypes.INTEGER,
    languages: DataTypes.STRING,
    publisher_id: DataTypes.STRING
  }, {});
  book.associate = function(models) {
    // associations can be defined here
  };
  return book;
};