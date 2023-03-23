const User = require('./User');
const Post = require('./Post');

// Future Dev
// const like
// const comment
// const follower

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post };
