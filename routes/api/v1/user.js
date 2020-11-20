const express = require('express');

const router = express.Router();
// import passport to add authentication middleware
const passport = require('passport');

// import assets controller api
const userApi = require('../../../controllers/api/v1/user_api');

router.post('/register', userApi.register);
router.post('/login', userApi.login);

module.exports = router;
