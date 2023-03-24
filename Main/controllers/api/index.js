const router = require('express').Router();
const userRoutes = require('./userRoutes');
const robotRoutes = require('./robotRoutes');

router.use('/users', userRoutes);
router.use('/robots', robotRoutes);

module.exports = router;
