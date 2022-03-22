//import mongoose
const mongoose = require('mongoose');


require("dotenv").config(); // For loading env variables
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = mongoose.connection;