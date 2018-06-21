import models from '../models';
import utils from '../utils';

const { logger } = utils;

const Book = models.Books;

export default {
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
        author: req.decoded.username
      }).then((newBook) => {
        res.status(201).send({
          message: `Book with title:- ${newBook.title} successfully created`
        });
      }).catch((error) => {
        logger.info(error.message);
        res.status(500).send({
          message: 'Internal Server Error'
        });
      });
    });
  }
};

