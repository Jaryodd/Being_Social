const router = require("express").Router();
const {
    allThoughts,
    singleThought,
    makeThought,
    deleteThought,
    makeReaction,
    removeReaction,
} = require("../../controllers/thoughtsController");


router.route("/").get(allThoughts).post(makeThought);


router.route("/:thoughtId").get(singleThought).delete(deleteThought);


router.route("/:thoughtId/reactions").post(makeReaction);


router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
