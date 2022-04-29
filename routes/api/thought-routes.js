const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller.js');

// /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought);

// /api/thoughts/<thought ID>
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);


// /api/thoughts/<thought ID>/reactions
router.route('/:id/reactions')
.put(addReaction)

// /api/thoughts/<thought ID>/reactions/<reaction ID>
router.route('/:id/reactions/:reactionId')
.put(deleteReaction);

module.exports = router;