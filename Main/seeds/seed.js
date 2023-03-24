const sequelize = require('../config/connection');
const { User, Robot, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const robotData = require('./robotData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const robot of robotData) {
    await Robot.create({
      ...robot,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
