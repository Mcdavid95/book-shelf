import express from 'express';
import utils from './utils';
import userController from './controllers/users';
import bookController from './controllers/books';

const {
  signupInput,
  signInInput,
  bookInput,
  hasToken,
  ratingInput,
  updateInput,
  deleteInput
} = utils;

const { register, login } = userController;

const {
  createBook, listBooks, rateBooks, updateBook, deleteBook, getBook
} = bookController;

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up route
router.post('/user/register', signupInput, register);

// Login route
router.post('/user/login', signInInput, login);

// ======================
// BOOK ROUTES
// ======================

// Create Book
router.post('/book', hasToken, bookInput, createBook);

// Get List of Books
router.get('/books', listBooks);

// Rate Book
router.post('/book/:id/rate', hasToken, ratingInput, rateBooks);

// Get One Book
router.get('/book/:id', deleteInput, getBook);

// Update Book
router.put('/book/:id', hasToken, updateInput, updateBook);

// Delete Book
router.delete('/book/:id', hasToken, deleteInput, deleteBook);

export default router;
