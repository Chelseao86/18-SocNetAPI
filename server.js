//relationships
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');

//initialize
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');

//middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

////implement and use
app.use(routes);

//create connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetDB', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('debug', true);

db.once('open', () => {
  app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
  });
});
