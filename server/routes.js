import express from 'express';
import utils from './utils';
// import jwtVerify from '../utils/jwtVerify';


import userController from './controllers/users';

const router = express.Router();

// ======================
// AUTH ROUTES
// ======================

// Sign up route
router.post('/user/register', utils.signupInput, userController.register);

// Login route
router.post('/user/login', utils.signInInput, userController.login);

export default router;
