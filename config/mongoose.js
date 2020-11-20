const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://<username>:<password>@cluster0.rwzf7.mongodb.net/<db-name>?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function () {
  console.log('Connected to database:: MongoDB');
});

module.exports = db;
