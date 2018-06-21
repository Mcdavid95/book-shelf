import jwt from 'jsonwebtoken';
import bunyan from 'bunyan';

export default {
  /**
   * createToken
   * @param {Number} id user id gotten from database
   * @param {String} username username of logged user
   * @description creates new jwt token for authentication
   * @returns {String} newly created jwt
   */
  createToken(id, username) {
    const token = jwt.sign(
      {
        id,
        username
      },
      'process.env.SECRET'
    );
    return token;
  },

  /**
   * logger
   * @returns {Object} object containing logger functions
   */
  logger() {
    const log = bunyan.createLogger({ name: 'myapp' });
    return log;
  },
  /**
   * @method signupInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signupInput(req, res, next) {
    const { username, password, email } = req.body;
    if (typeof (username) === 'undefined') {
      return res.status(401).json({
        message: 'Username field must not be empty'
      });
    } else if (typeof (password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    } else if (typeof (email) === 'undefined') {
      return res.status(401).send({
        message: 'Email field must not be empty'
      });
    }
    // else if (!validator.isEmail(req.body.email)) {
    //   return res.status(401).send({
    //     message: 'Please put in a proper email address'
    //   });
    // }
    return next();
  },
  /**
   * @method signInInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signInInput(req, res, next) {
    const { email, password } = req.body;
    if (typeof (email) === 'undefined') {
      return res.status(401).json({
        message: 'Email field must not be empty'
      });
    } else if (typeof (password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    }
    return next();
  },
};
