const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate([
            {
                path: 'thoughts',
                select: '-__v'
            },
            {
                path: 'friends',
                select: '-__v'
            }
        ])
        .select('-__v')
        .sort('username')
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    // get user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate([
            {
                path: 'thoughts',
                select: '-__v'
            },
            {
                path: 'friends',
                select: '-__v'
            }
        ])
        .select('-__v')
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this ID."});
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err));
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },

    // update user by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this ID."});
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this ID."});
                return;
            }

            // deletes all thougths associated with user
            Thought.deleteMany({ username: userData.username })
            .then(thoughtData => {
                console.log(thoughtData);
                res.json(userData);
            })
        })
        .catch(err => res.status(400).json(err));
    },

    // add friend
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: body.friendId } },
            { new: true, runValidators: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this ID."});
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err));
    },

    // remove friend
    removeFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: body.friendId } },
            { new: true, runValidators: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this ID."});
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;