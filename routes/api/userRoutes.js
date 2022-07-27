const router = require("express").Router();

const {
  allUsers,
  OneUser,
  makeUser,
  deleteUser,
  updateUser,
  followUser,
  UnfollowUser,
} = require("../../controllers/userController.js");


router.route("/").get(allUsers).post(makeUser);


router.route("/:userId").get(OneUser).put(updateUser).delete(deleteUser);


router.route("/:userId/following").post(followUser);


router.route("/:userId/following/:followingId").delete(UnfollowUser);

module.exports = router;
