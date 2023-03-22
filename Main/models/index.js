const User = require('./User');
const Robot = require('./Robot');

User.hasMany(Robot, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Robot.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Robot };
