const express = require('express');

const router = express.Router();

const user = require('./user');
const asset = require('./asset');

router.use('/user', user);
router.use('/asset', asset);
module.exports = router;
