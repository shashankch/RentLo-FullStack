// import express
const express = require('express');

// import express router
const router = express.Router();

// import passport for authentication
const passport = require('passport');

// import user controller actions
const usersController = require('../controllers/users_controller');

// route to render logged in user profile
router.get(
  '/profile/:id',
  passport.checkAuthentication,
  usersController.profile
);

// route to update user profile like password and username
router.post(
  '/update/:id',
  passport.checkAuthentication,
  usersController.update
);

// route to render sign in page
router.get('/', usersController.signIn);

// route to render sign up page
router.get('/sign-up', usersController.signUp);

// route to create user in db
router.post('/create', usersController.create);

// using passport as a middleware to authenticate
// to login user
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/' }),

  usersController.createSession
);

// to logout user
router.get('/sign-out', usersController.destroySession);

router.use('/home', require('./home'));
router.use('/api', require('./api'));
// export router
module.exports = router;
