const User = require('./User');
const Post = require('./Post');
const Robot = require('./Robot');

// Future Dev
// const like
// const comment
// const follower

User.belongsToMany(Robot, { through: 'UserRobot' });
Robot.belongsToMany(User, { through: 'UserRobot' });

// Robot.belongsToMany(User, { foreignKey: 'user_id' });
// Robot.belongsToMany(Image, { foreignKey: 'image_id' });

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Robot, Post };
