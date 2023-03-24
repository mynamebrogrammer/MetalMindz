const User = require('./User');
const Robot = require('./Robot');
const Post = require('./Post');

User.hasMany(Robot, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Robot.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Robot, Post};
