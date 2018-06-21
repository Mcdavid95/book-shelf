import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import models from '../models';
import utils from '../utils';

const { createToken, logger } = utils;


dotenv.config();

const User = models.Users;

const saltRounds = process.env.SALT;

export default {
  /**
   * @method register
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the response
   * @description recieves user details and create an instance of the User Model in the database
   */
  register(req, res) {
    const { username, email, password } = req.body;
    User.findOne({
      where: {
        username: username.trim().toLowerCase()
      }
    }).then((name) => {
      if (name) {
        res.status(409).send({ message: 'Username already in use' });
      } else {
        User.findOne({
          where: {
            email: email.trim().toLowerCase()
          }
        }).then((isEmail) => {
          if (isEmail) {
            res.status(409).send({
              sucsess: false,
              message: 'Email already in use'
            });
          } else {
            bcrypt.hash(password, parseInt(saltRounds, 10)).then((hash) => {
              User.create({
                username: username.trim().toLowerCase(),
                password: hash,
                email: email.trim().toLowerCase()
              }).then((user) => {
                res.status(201).send({
                  token: createToken(user.id, user.username),
                  sucsess: true,
                  message: 'User succesfully created'
                });
              }).catch((error) => {
                logger.info(error);
                res.status(500).send({
                  sucsess: false,
                  message: 'Internal Server Error'
                });
              });
            });
          }
        });
      }
    });
  },

  /**
   * @method login
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and jwt token
   * @description recieves user details and checks if it exists in the database and returns a token
   */
  login(req, res) {
    const { email, password } = req.body;
    User
      .findOne({
        where:
        { email: email.trim().toLowerCase() }
      }).then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Email address not correct'
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).send({
            message: 'Incorrect password'
          });
        }
        if (user) {
          return res.status(202).send({
            token: createToken(user.id, user.username),
            message: 'Welcome back'
          });
        }
        res.status(404).send({
          message: 'Validation Error'
        });
      });
  }
};
