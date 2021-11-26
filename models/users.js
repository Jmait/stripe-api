
const { Sequelize, DataTypes } = require('sequelize');
const DB = process.env.DB_URL;
const sequelize = new Sequelize(DB)

module.exports = sequelize.define('user', {
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    field: 'name',
    type: Sequelize.STRING,
  },
  email: {
    field: 'email',
    type: Sequelize.STRING
  },
  password: {
    field: 'password',
    type: Sequelize.STRING
  },
  phone: {
    field: 'phone',
    type: Sequelize.STRING
  },
  address: {
    field: 'address',
    type: Sequelize.STRING
  },
  unit: {
    field: 'unit',
    type: Sequelize.STRING
  },
  city: {
    field: 'city',
    type: Sequelize.STRING
  },
  state: {
    field: 'state',
    type: Sequelize.STRING
  },
  zip: {
    field: 'zip',
    type: Sequelize.INTEGER
  },
  account_type: {
    field: 'account_type',
    type: Sequelize.STRING
  },
  createdAt: {
    field: 'createdAt',
    type: Sequelize.DATE
  },
  deletedAt: {
    field: 'deletedAt',
    type: Sequelize.DATE
  },
}, { timestamps: false })