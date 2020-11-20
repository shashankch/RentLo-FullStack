// import user model
const User = require('../models/user');

// import bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
// to avoid attack config for bcrypt to set encryption level
const saltRounds = 10;

// to import crypto to generate random string
const crypto = require('crypto');

// controller action to render profile update page with passing all registered users
// to verify identity of logged in user to update their profile.
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render('user_profile', {
      title: 'User profile',
      profile_user: user,
    });
  });
};

// controller action to update password and username with passwords stored in encrypted format
module.exports.update = async function (req, res) {
  try {
    // to check if password and confirm pass matches
    if (req.user.id == req.params.id) {
      if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords mismatch');
        return res.redirect('back');
      }

      const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);

      await User.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,

          password: bcryptPassword,
        },
        (err, user) => {
          if (err) {
            console.log(err);
            return res.redirect('back');
          }
          req.flash('success', 'Updated!');
          return res.redirect('back');
        }
      );
    } else {
      req.flash('error', 'Unauthorized!');
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    console.log(err);
    req.flash('error', err);
    return res.redirect('/');
  }
};

// controller action render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/home');
  }

  return res.render('user_sign_up', {
    title: 'Auth| sign up',
  });
};

// contoller action to render sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/home');
  }
  return res.render('user_sign_in', {
    title: 'Auth| sign in',
  });
};

// controller action to create user on sign up if not exists in the db
module.exports.create = async function (req, res) {
  try {
    // to check if password and confirm pass matches
    if (req.body.password != req.body.confirm_password) {
      req.flash('error', 'Passwords mismatch');
      return res.redirect('back');
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);

      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: bcryptPassword,
          type: 'owner',
        },
        (err, user) => {
          if (err) {
            req.flash('error', err);
            return res.redirect('back');
          }
          req.flash('success', 'Registration success');
          return res.redirect('/');
        }
      );
    } else {
      req.flash('success', 'You already signed up, login to continue!');
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};

// render the home page on successfull sign in with notification
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully !');
  return res.redirect('/home');
};

// render the home page on successfull log out of user with notification
module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success', 'Logged out Successfully !');
  return res.redirect('/');
};
