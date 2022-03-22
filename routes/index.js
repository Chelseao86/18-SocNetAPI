//Relationships for main routes
const router = require('express').Router();
const api = require('./api');

//Usage for main routes
router.use('/api', api);
// router.use((req, res) => {
//     return res.send('Wrong route');
// });

//Export main routes
module.exports = router;