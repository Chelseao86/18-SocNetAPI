//Relationship - user routes
const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  addFriend,
  // unFriend,
} = require('../../controllers/user-controller');

//User routes
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getOneUser).put(updateUser);
// router.route('/:userId/friends/:friendId').post(addFriend).delete(unFriend);

//Export user routes
module.exports = router;