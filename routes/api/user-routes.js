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

// /api/users/<user ID>
router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// /api/users/<user ID>/friend
router.route('/:id/friend')
.put(addFriend);

// /api/users/<user ID>/unfriend
router.route('/:id/unfriend')
.put(removeFriend);

module.exports = router;