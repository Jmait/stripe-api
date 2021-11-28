const express = require('express');
const Sequelize = require('sequelize');
const { restricted } = require('../../auth/authenticate.js');
const ServiceOrder = require('../../models/serviceorders.js');
const User = require('../../models/users.js');
const Service = require('../../models/services.js');
const Photographer = require('../../models/photographers.js');

const serviceOrdersRouter = express.Router();

User.hasMany(ServiceOrder, { foreignKey: 'user_id' });
ServiceOrder.belongsTo(User, { foreignKey: 'user_id' });

Service.hasMany(ServiceOrder, { foreignKey: 'service_id' });
ServiceOrder.belongsTo(Service, { foreignKey: 'service_id' });

Photographer.hasMany(ServiceOrder, { foreignKey: 'photographer_id' });
ServiceOrder.belongsTo(Photographer, { foreignKey: 'photographer_id' });

// --------------------
// GET ALL MERCH ORDERS
// --------------------
serviceOrdersRouter.get('/', restricted, async (req, res) => {
  try {
    const orders = await ServiceOrder.findAll({
      where: { deletedAt: null },
      include: [Service, Photographer, User]
    });
    if (orders) res.status(200).json(orders)
    else res.status(404).json({ err: 'No orders found' })
  } catch (err) { console.log(err),res.status(500).json({ err: 'Internal server error', err })}
});

// ---------------------
// GET MERCH ORDER BY ID
// ---------------------
serviceOrdersRouter.get('/:id', restricted, async (req, res) => {
  let { id } = req.params;

  try {
    const order = await ServiceOrder.findAll({ where: { id: id, deletedAt: null }})
    if (order) res.status(200).json(order)
    else res.status(404).json({ err: 'No order found with this ID' })
  } catch (err) { res.status(500).json({ err: 'Internal server error', err })}
});

// -----------------------
// EDIT MERCH ORDERY BY ID
// -----------------------
serviceOrdersRouter.put('/:id/edit', restricted, async (req, res) => {
  let { id } = req.params;
  let { body } = req;

  try {
    const order = await ServiceOrder.findAll({ where: { id: id }});
    if (order) {
      const editOrder = await ServiceOrder.update(body, { where: { id: id }})
      if (editOrder) {
        const orders = await ServiceOrder.findAll({ where: { deletedAt: null }})
        res.status(202).json(orders);
      } else res.status(500).json({ err: 'Server Error, could not find orders' })
    } else res.status(404).json({ err: 'Order not found' })
  } catch (err) { res.status(500).json({ err: 'Internal server error', err })}
});

// ------------------------
// DELETE MERCH ORDER BY ID
// ------------------------
serviceOrdersRouter.put('/:id/delete', restricted, async (req, res) => {
  let { id } = req.params;

  try {
    const order = await ServiceOrder.findAll({ where: { id: id }})
    if (order) {
      const deletedOrder = await ServiceOrder.update({
        deletedAt: new Date()}, {
          where: { id: id }
      })
      if (deletedOrder) {
        const orders = await ServiceOrder.findAll({ where: { deletedAt: null }})
        res.status(202).json(orders)
      } else res.status(500).json({ err: 'Could not delete order' })
    } else res.status(404).json({ err: 'No order ound with that ID' })
  } catch (err) { res.status(500).json({ err: 'Internal server error', err })}
});

module.exports = serviceOrdersRouter;