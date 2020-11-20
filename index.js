// import express
const express = require('express');

// import cookier parser to parse cookies
const cookieParser = require('cookie-parser');
const path = require('path');
// start the express server
const app = express();

// setting port
const port = process.env.PORT || 8000;
const cors = require('cors');
// import express-ejs-layouts module
const expressLayouts = require('express-ejs-layouts');

// import mongodb  configuration
const db = require('./config/mongoose');

// import express session to store session cookies to authenticate user
const session = require('express-session');

// import passport to authenticate user and requests
const passport = require('passport');

// import passport local strategy
const passportLocal = require('./config/passport-local-strategy');

// import passport jwt strategy
const passportJWT = require('./config/passport-jwt-strategy');

// storing session cookie in mongostore db to avoid loss on server restart
const MongoStore = require('connect-mongo')(session);

// import flash to store success and error message to display
const flash = require('connect-flash');

// middleware to set flash messages.
const customMware = require('./config/middleware');

// import bcrypt to encrypt password before storing in db
const Bcrypt = require('bcrypt');

// to parse form data
app.use(express.urlencoded({ extended: true }));

// using cookie parser
app.use(cookieParser());

// setting path to assets directory
app.use(express.static('./assets'));

// using express layouts to separate code and to make it scalable
app.use(expressLayouts);

// extracting css and scripts from other pages and adding in layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(cors());
// setting view engine as ejs and setting view directory
app.set('view engine', 'ejs');
app.set('views', './views');

// here storing session key in encrypted format with secret key
// storing in mongostore db and also setting expiry time
app.use(
  session({
    name: 'rentlo',

    secret: 'supersecretxyz',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: 'disabled',
      },
      function (err) {
        console.log(err || 'connect-mongodb setup 0k');
      }
    ),
  })
);

// initialize passport t
app.use(passport.initialize());

// set passport to use session cookie
app.use(passport.session());

// setting logged in user
app.use(passport.setAuthenticatedUser);

// using flash
app.use(flash());
app.use(customMware.setFlash);

// including routes
app.use('/admin', require('./routes'));

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// listen on the port
app.listen(port, function (err) {
  if (err) {
    console.log('error:', err);
    console.log(`Error in running the server:${err}`);
  }

  console.log(`Server is running on port:${port}`);
});
