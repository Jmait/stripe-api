'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tracking extends Model {
    static associate(models) {
      tracking.associate = models => {
        tracking.belongsTo(models.users, {
          foreignKey: 'user_id',
        });
      }
    }
  };
  tracking.init({
    route: DataTypes.STRING,
    entry_time:DataTypes.DATE,
    exit_time: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, { sequelize, modelName: 'tracking' });
  return tracking;
};