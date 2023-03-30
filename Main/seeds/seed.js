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
  console.log(users);

  for (const robot of robotData) {
    const user = users[Math.floor(Math.random() * users.length)];
    await Robot.create({
      ...robot,
      user_id: user.id,
    });
  }
  const robots = await Robot.findAll();
  console.log(robots);

  for (const post of postData) {
    const user = users[Math.floor(Math.random() * users.length)];
    const robot = robots[Math.floor(Math.random() * robots.length)];

    await Post.create({
      ...post,
      user_id: user.id,
      robot_id: robot.id,
    });
  }
  process.exit(0);
};

seedDatabase();
