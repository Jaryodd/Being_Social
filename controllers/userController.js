const { User, Thought } = require("../models");

module.exports = {
    allUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    oneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    makeUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID." })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User and Thought deleted." }))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this ID." })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    followUser(req, res) {
        console.log("You are following a user!");
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { following: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID." })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    UnfollowUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { following: req.params.followingId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID." })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
