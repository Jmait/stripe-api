
const Sequelize = require('sequelize');
const DB = process.env.DB_URL;
const sequelize = new Sequelize(DB)

module.exports = sequelize.define('photographer', {
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    field: 'name',
    type: Sequelize.STRING
  },
  bio: {
    field: 'bio',
    type: Sequelize.TEXT
  },
  profile_image: {
    field: 'profile_image',
    type: Sequelize.STRING
  },
  insta_username: {
    field: 'insta_username',
    type: Sequelize.STRING
  },
  createdAt: {
    field: 'createdAt',
    type: Sequelize.DATE
  },
  deletedAt: {
    field: 'deletedAt',
    type: Sequelize.DATE
  }
}, { timestamps: false })
