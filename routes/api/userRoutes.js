const router = require('express').Router();
const {
  allUsers,
  singleUser,
  createUser,
  deleteUser,
  addFriends,
  removeFriends,
  editUser,
} = require('../../controllers/userController');


router.route('/').get(allUsers).post(createUser);


router.route('/:userId').get(singleUser).delete(deleteUser).put(editUser);

router.route('/:userId/friends/:friendId').delete(removeFriends).post(addFriends);

module.exports = router;
