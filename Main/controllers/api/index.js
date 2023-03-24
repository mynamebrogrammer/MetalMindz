const router = require('express').Router();
const userRoutes = require('./userRoutes');
const robotRoutes = require('./robotRoutes');
const postsRoutes = require('./postsRoutes');

router.use('/users', userRoutes);
router.use('/robots', robotRoutes);
router.use('/posts', postsRoutes);

module.exports = router;
