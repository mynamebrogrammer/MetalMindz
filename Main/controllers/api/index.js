const router = require('express').Router();
const userRoutes = require('./userRoutes');
const robotRoutes = require('./robotRoutes');
const postsRoutes = require('./postsRoutes');
const profileRoutes = require('./profileRoutes');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
    } catch (error) {
        console.log(error);
  }
};

const getAssetInfo = async (publicId) => {
    const options = {
        colors: true,
    };

    try {
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

const createImageTag = (publicId, ...colors) => {
    const [effectColor, backgroundColor] = colors;
    let imageTag = cloudinary.image(publicId, {
        transformation: [
          { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
          { radius: 'max' },
          { effect: 'outline:10', color: effectColor },
          { background: backgroundColor },
        ],
      });
  
      return imageTag;
  };

  (async () => {

    // Set the image to upload
    const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

    // Upload the image
    const publicId = await uploadImage(imagePath);

    // Get the colors in the image
    const colors = await getAssetInfo(publicId);

    // Create an image tag, using two of the colors in a transformation
    const imageTag = await createImageTag(publicId, colors.colors[0][0], colors.colors[1][0]);

    // Log the image tag to the console
    console.log(imageTag);

})();
router.use('/users', userRoutes);
router.use('/robots', robotRoutes);
router.use('/posts', postsRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
