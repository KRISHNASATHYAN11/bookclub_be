const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  noOfPages: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  uploadedImages: {
    type: Array,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userMail: {
    type: String,
    required: true,
  },
 
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
