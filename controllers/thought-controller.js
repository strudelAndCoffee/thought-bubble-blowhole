const { Thought } = require('../models');

const thoughtController ={
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
    getThoughtById() {},

    // create thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    // update thought by ID
    updateThought({ params, body }, res) {},

    // delete thought
    deleteThought({ params }, res) {}
};

module.exports = thoughtController;