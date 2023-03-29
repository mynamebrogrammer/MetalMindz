const router = require('express').Router();
const userRoutes = require('./userRoutes');
const robotRoutes = require('./robotRoutes');
const postsRoutes = require('./postsRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/users', userRoutes);
router.use('/robots', robotRoutes);
router.use('/posts', postsRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
