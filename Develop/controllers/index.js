const router = require('express').Router();
const homeRoutes = require('./homeRoutes')
const noteRoutes = require('./api/noteRoutes');

router.use('/', homeRoutes)
router.use('/api', noteRoutes);

module.exports = router;