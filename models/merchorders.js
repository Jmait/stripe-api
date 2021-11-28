
const { Sequelize, DataTypes } = require('sequelize');
const DB = process.env.DB_URL;
const sequelize = new Sequelize(DB)

module.exports = sequelize.define('merchOrders', {
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  status: {
    field: 'status',
    type: Sequelize.STRING,
  },
  tracking: {
    field: 'tracking',
    type: Sequelize.STRING
  },
  quantity: {
    field: 'quantity',
    type: Sequelize.INTEGER
  },
  payment_token: {
    field: 'payment_token',
    type: Sequelize.STRING,
  },
  size: {
    field: 'size',
    type: Sequelize.STRING
  },
  user_id: {
    field: 'user_id',
    type: Sequelize.INTEGER
  },
  merch_id: {
    field: 'merch_id',
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