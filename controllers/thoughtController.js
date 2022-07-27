
const { User, Thought } = require("../models");


const thoughtController = {
    allThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbUserData) => {
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    singleThought(req, res) {
        Thought.findOne({
            _id: req.params.thoughtId
        })
            .populate("reactions")
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    editThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        },
            {
                $set: req.body
            }, {
            new: true
        })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({
            _id: req.params.thoughtId
        })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        }, {
            $addToSet: { reactions: req.body }
        }, {
            new: true
        })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        }, {
            $pull: { reactions: { reactionId: req.params.reactionId } }
        }, {
            new: true
        })
            .then(userData => res.json(userData))
            .catch(err => res.json(err))
    },
}

module.exports = thoughtController
