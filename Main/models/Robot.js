const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Robot extends Model {}

Robot.init(
    {
      id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: '#',
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'like',
    }
  );
  module.exports = Robot;
  