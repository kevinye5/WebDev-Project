const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Add other user fields as needed
});

const bookSchema = new mongoose.Schema({
  ISBN: String,
  BookId: String,
  BookTitle: String,
  BookAuthor: String,
  YearOfPublication: Number,
  Publisher: String,
  ImageURLS: String,
  ImageURLM: String,
  ImageURLL: String,
});

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);

module.exports = { User, Book };
