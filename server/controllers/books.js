import models from '../models';
import utils from '../utils';

const { logger, calcAverage } = utils;

const Book = models.Books;

export default {
  /**
   * createBook
   * @method
   * @param {*} req
   * @param {*} res
   * @description creates a new book in the database
   * @returns {Object} response object
   */
  createBook(req, res) {
    const { title } = req.body;
    Book.findOne({
      where: {
        title: title.trim().toLowerCase()
      }
    }).then((book) => {
      if (book) {
        return res.status(409).send({
          succcess: false,
          message: 'Book with that title already exists'
        });
      }
      Book.create({
        title: title.trim().toLowerCase(),
        author: req.decoded.username,
        userId: req.decoded.id,
        ratings: []
      }).then((newBook) => {
        res.status(201).send({
          success: true,
          message: `Book with title:- ${newBook.title} successfully created`
        });
      }).catch((error) => {
        logger().info(error.message);
        res.status(500).send({
          succcess: false,
          message: 'Internal Server Error'
        });
      });
    });
  },
  /**
   * 
   * @param {Object} req request object
   * @param {Object} res
   * @description get details about a selected book based on id supplied in params
   * @returns {Object} response object
   */
  getBook(req, res) {
    const { id } = req.params;
    Book.findOne({
      where: {
        id,
      }
    }).then((book) => {
      if (book) {
        return res.status(200).send({
          success: true,
          book
        });
      }
      return res.status(404).send({
        success: false,
        message: 'Book does not exist'
      });
    }).catch((error) => {
      logger().info(error);
      return res.status(500).send({
        succcess: false,
        message: 'Internal Server Error'
      });
    });
  },
  /**
   * listBooks
   * @param {Object} req request object
   * @param {Object} res
   * @description fetches list of books from the database
   * @returns {Object} response object
   */
  listBooks(req, res) {
    Book.findAll({
      attributes: ['id', 'title', 'author', 'averageRatings', 'userId']
    }).then((books) => {
      if (books.length > 0) {
        return res.status(200).send({
          succcess: true,
          books
        });
      }
      return res.status(200).send({
        success: true,
        message: 'No Books Found'
      });
    }).catch((error) => {
      logger().info(error.message);
      res.status(500).send({
        succcess: false,
        message: 'Internal Server Error'
      });
    });
  },

  /**
   * rateBooks
   * @param {Object} req request Object
   * @param {Object} res
   * @description rate books 1-5
   * @returns {Object} response object
   */
  rateBooks(req, res) {
    const { id } = req.params;
    const { rating } = req.body;
    Book.findOne({
      where: {
        id
      }
    }).then((book) => {
      if (book) {
        book.ratings.push(Number(rating));
        book.update(
          {
            ratings: book.ratings,
            averageRatings: calcAverage(book.ratings)
          },
          {
            where: {
              id
            }
          }
        ).then(updatedBook => res.status(200).send({
          success: true,
          updatedBook
        })).catch((error) => {
          logger().info(error);
          return res.status(500).send({
            succcess: false,
            message: 'Internal Server Error'
          });
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'Book does not exist'
        });
      }
    });
  },

  /**
   * updateBook
   * @param {Object} req request object
   * @param {Object} res
   * @description update book title
   * @returns {Object} response object
   */
  updateBook(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    Book.findOne({
      where: {
        id,
      }
    }).then((book) => {
      if (book) {
        if (book.userId === req.decoded.id) {
          book.update(
            {
              title
            },
            {
              where: {
                id
              }
            }
          ).then(updatedBook => res.status(200).send({
            success: true,
            message: 'Book successfully updated',
            updatedBook
          })).catch((error) => {
            logger().info(error);
            return res.status(500).send({
              succcess: false,
              message: 'Internal Server Error'
            });
          });
        } else {
          return res.status(403).send({
            success: false,
            message: 'You do not have permission to edit this book'
          });
        }
      } else {
        return res.status(404).send({
          success: false,
          message: 'Book does not exist'
        });
      }
    });
  },

  /**
   * deleteBook
   * @param {Object} req request object
   * @param {Object} res
   * @description delete a book based on id
   * @returns {Object} response object
   */
  deleteBook(req, res) {
    const { id } = req.params;
    Book.findOne({
      where: {
        id,
      }
    }).then((book) => {
      if (book) {
        if (book.userId === req.decoded.id) {
          book.destroy({ force: true })
            .then(() => res.status(200).send({
              success: true,
              message: 'Book sucessfully deleted'
            }));
        } else {
          return res.status(403).send({
            success: false,
            message: 'You do not have permission to edit this book'
          });
        }
      } else {
        return res.status(404).send({
          success: false,
          message: 'Book does not exist'
        });
      }
    });
  }
};
