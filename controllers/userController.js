const { User, Thought } = require("../models");

const userController = {
    //where we create controller methods
    //get all users, get user by ID, create user, update user, 
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({
            _id: req.params.userId
        })
            .populate("thoughts")
            .populate("friends")
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    editUser(req, res) {
        User.findOneAndUpdate({
            _id: req.params.userId
        },
            {
                $set: req.body
            }, {
            new: true
        })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    deleteUser(req, res) {
        User.findOneAndDelete({
            _id: req.params.userId
        })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    addFriends(req, res) {
        User.findOneAndUpdate({
            _id: req.params.userId
        }, {
            $push: { friends: req.params.friendId }
        }, {
            new: true
        })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    removeFriends(req, res) {
        User.findOneAndUpdate({
            _id: req.params.userId
        }, {
            $pull: { friends: req.params.friendId }
        }, {
            new: true
        })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
}

module.exports = userController