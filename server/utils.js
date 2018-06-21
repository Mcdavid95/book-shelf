import jwt from 'jsonwebtoken';
import bunyan from 'bunyan';
import validator from 'validator';

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
      process.env.SECRET
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
    } else if (!validator.isEmail(req.body.email)) {
      return res.status(401).send({
        message: 'Please put in a proper email address'
      });
    }
    return next();
  },
  /**
   * @method signInInput
   * @param {Object} req
   * @param {Object} res
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
  /**
   * @method bookInput
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {*} response
   */
  bookInput(req, res, next) {
    const { title } = req.body;
    if (typeof (title) === 'undefined') {
      return res.status(401).json({
        message: 'Title field must not be empty'
      });
    }
    return next();
  },
  /**
  * @method ratingInput
  * @param {Object} req
  * @param {Object} res
  * @param {*} next
  * @returns {*} response
  */
  ratingInput(req, res, next) {
    const { id } = req.params;
    const { rating } = req.body;
    if (typeof (id) === 'undefined') {
      return res.status(401).json({
        message: 'id must be provided in params not be empty: /book/:id/rate'
      });
    } else if (isNaN(parseInt(id, 10))) {
      return res.status(401).json({
        message: 'id should be a number'
      });
    } else if (typeof (rating) === 'undefined') {
      return res.status(401).json({
        message: 'Rating field must not be empty'
      });
    }
    return next();
  },
  /**
  * @method updateInput
  * @param {Object} req
  * @param {Object} res
  * @param {*} next
  * @returns {*} response
  */
  updateInput(req, res, next) {
    const { title } = req.body;
    const { id } = req.params;
    if (typeof (id) === 'undefined') {
      return res.status(401).json({
        message: 'id must be provided in params not be empty: /book/:id/'
      });
    } else if (isNaN(parseInt(id, 10))) {
      return res.status(401).json({
        message: 'id should be a number'
      });
    } else if (typeof (title) === 'undefined') {
      return res.status(401).json({
        message: 'Title field must not be empty'
      });
    }
    return next();
  },
  /**
  * @method deleteInput
  * @param {Object} req
  * @param {Object} res
  * @param {*} next
  * @returns {*} response
  */
  deleteInput(req, res, next) {
    const { id } = req.params;
    if (typeof (id) === 'undefined') {
      return res.status(401).json({
        message: 'id must be provided in params not be empty: /book/:id/'
      });
    } else if (isNaN(parseInt(id, 10))) {
      return res.status(401).json({
        message: 'id should be a number'
      });
    }
    return next();
  },
  /**
   *
   * @param {Array} arr
   * @returns {Float} average value of array contents
   */
  calcAverage(arr) {
    let sum = 0;
    arr.forEach((item) => {
      sum += item;
    });
    return sum / arr.length;
  },
  /**
   * @method hasToken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {Object} response object
   */
  hasToken(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: err
          });
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      return res.status(403).send({
        message: 'You have to be loggedin first'
      });
    }
  }
};
