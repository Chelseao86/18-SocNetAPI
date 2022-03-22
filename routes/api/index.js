//Relationships for API routes
const router = require('express').Router();
const user = require('./user-routes');
const thought = require('./thought-routes');

//API route usage
router.use('/users', user);
router.use('/thoughts', thought);

//Export API routes
module.exports = router;