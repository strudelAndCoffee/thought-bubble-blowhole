const { User, Thought } = require('../models');

const userController = {
    // GET ALL Users
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

    // GET User by ID
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

    // CREATE User
    createUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },

    // UPDATE User by ID
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

    // DELETE User
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
            })
            .catch(err => res.status(400).json(err));

            res.json({ message: "User removed!" });
        })
        .catch(err => res.status(400).json(err));
    },

    // ADD Friend
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
            res.json({ message: "Friend added!" })
        })
        .catch(err => res.status(400).json(err));
    },

    // REMOVE Friend
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
            res.json({ message: "Friend removed!" })
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;