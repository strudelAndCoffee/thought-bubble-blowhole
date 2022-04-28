const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/', apiRoutes);
router.use((req, res) => {
    res.status(404).json()
});

module.exports = router;