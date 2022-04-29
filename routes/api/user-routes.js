const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller.js');

// /api/users
router.route('/')
.get(getAllUsers)
.post(createUser);

// /api/users/:id
router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// /api/users/friend/:id
router.route('/friend/:id')
.put(addFriend);

// /api/users/unfriend/:id
router.route('/unfriend/:id')
.put(removeFriend);

module.exports = router;