// import user model
const User = require('../../../models/user');

// import jsonweb token module to create token
const jwt = require('jsonwebtoken');

// import bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
// to avoid attack config for bcrypt to set encryption level
const saltRounds = 10;

// to import crypto to generate random string
const crypto = require('crypto');

// controller action to register user by name,email and password and sending success result
module.exports.register = async (req, res) => {
  try {
    // find if already present in db
    let user = await User.findOne({ email: req.body.email });
    const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);
    // if new registration then storing user info
    if (!user) {
      let newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcryptPassword,
        type: 'tenant',
      });

      // sending the success response message
      return res.status(200).json({
        message: 'Registration Success!',
      });
    } else {
      // if present then sending that registered  user info
      return res.status(200).json({
        message: 'Already registered with us Try Logging-in !!',
      });
    }
  } catch (error) {
    // return error response on request failure
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

// controller action to login registered user using email and password
module.exports.login = async (req, res) => {
  try {
    // find if present in db
    let user = await User.findOne({ email: req.body.email });

    // check if user does not exists or invalid credentials and sending appropriate response
    if (!user || user.type === 'owner') {
      return res.status(422).json({
        message: 'Invalid Attempt',
      });
    }

    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result != true) {
        return res.status(422).json({
          message: 'Invalid username or password',
        });
      } else {
        // return success response with jwt token created from doctor's info.
        return res.status(200).json({
          message: 'Sign in successful,here is your token,please keep it safe!',
          data: {
            token: jwt.sign(user.toJSON(), 'rentLo', { expiresIn: '3600000' }),
            user: user.toJSON(),
          },
          success: true,
        });
      }
    });
  } catch (error) {
    // return error response on request failure
    console.log('***', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
