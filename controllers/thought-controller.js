const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ createdAt: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    // get thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this ID."});
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    // CREATE Thought
    createThought({ body }, res) {

        // check that username matches existing user
        User.findOne({ username: body.username })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this username." });
                return;
            }       
            
            // create thought
            Thought.create(body)
            .then(thoughtData => {

                // add thought to user's thoughts array
                User.findOneAndUpdate(
                    { _id: userData._id },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true, runValidators: true }
                )
                .catch(err => res.json(err))

                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err));     
        })
    },

    // update thought by ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { thoughtText: body.thoughtText },
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this ID."});
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this ID."});
                return;
            }

            User.findOneAndUpdate(
                { username: thoughtData.username },
                { $pull: { thoughts: thoughtData._id } },
                { new: true, runValidators: true }
            )
            
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    // ADD Reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thought found with this ID."});
                return;
            }
            res.json({ message: "Reaction added!" })
        })
        .catch(err => res.status(400).json(err));
    },

        // REMOVE Reaction
        deleteReaction({ params }, res) {
            Thought.findOneAndUpdate(
                { _id: params.id },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true, runValidators: true }
            )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: "No thought found with this ID."});
                    return;
                }
                res.json({ message: "Reaction removed!" })
            })
            .catch(err => res.status(400).json(err));
        }
};

module.exports = thoughtController;