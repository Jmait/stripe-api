
const { Sequelize, DataTypes } = require('sequelize');
const DB = process.env.DB_URL;
const sequelize = new Sequelize(DB)

module.exports = sequelize.define('serviceOrders', {
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  location: {
    field: 'location',
    type: Sequelize.STRING
  },
  comment: {
    field: 'comment',
    type: Sequelize.STRING
  },
  date: {
    field: 'date',
    type: Sequelize.STRING
  },
  payment_token: {
    field: 'payment_token',
    type: Sequelize.STRING
  },
  user_id: {
    field: 'user_id',
    type: Sequelize.INTEGER
  },
  service_id: {
    field: 'service_id',
    type: Sequelize.INTEGER
  },
  photographer_id: {
    field: 'photographer_id',
    type: Sequelize.INTEGER
  },
  createdAt: {
    field: 'createdAt',
    type: Sequelize.DATE
  },
  deletedAt: {
    field: 'deletedAt',
    type: Sequelize.DATE
  },
  updatedAt: {
    field: 'updatedAt',
    type: Sequelize.DATE
  },
}, { timestamps: false });