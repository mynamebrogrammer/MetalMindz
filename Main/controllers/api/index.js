const router = require('express').Router();
const userRoutes = require('./userRoutes');
const robotRoutes = require('./robotRoutes');
const postsRoutes = require('./postsRoutes');
const profileRoutes = require('./profileRoutes');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.use('/users', userRoutes);
router.use('/robots', robotRoutes);
router.use('/posts', postsRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
