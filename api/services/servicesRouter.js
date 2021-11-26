const express = require('express');
const { restricted } = require('../../auth/authenticate.js');
const Service = require('../../models/services.js');
const servicesRouter = express.Router();

// ----------------
// GET ALL SERVICES
// ----------------
servicesRouter.get('/', async (req, res) => {
  try {
    const services = await Service.findAll({ where: { deletedAt: null }});
    if (services) res.status(200).json(services)
    else res.status(404).json({ err: 'No services found' })
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
});

// -----------------
// GET SERVICE BY ID
// -----------------
servicesRouter.get('/:id', async (req, res) => {
  let { id } = req.params;

  try {
    const service = await Service.findAll({ where: { id: id }});
    if (service) res.status(200).json(service)
    else res.status(404).json({ err: 'No service found with this ID' })
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
});

// ------------------
// EDIT SERVICE BY ID
// ------------------
servicesRouter.put('/:id', restricted, async (req, res) => {
  let { id } = req.params;
  let { body } = req;

  try {
    const service = await Service.findAll({ where: { id: id }});
    if (service) {
      const editService = await Service.update(body, { where: { id: id }});
      if (editService) {
        const services = await Service.findAll({ where: { deletedAt: null }});
        res.status(202).json(services);
      } else res.status(500).json({ err: 'Server Error, Could not update user' })
    } else res.status(404).json({ err: 'Service not found' })
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
});

// --------------------
// DELETE SERVICE BY ID
// --------------------
servicesRouter.put('/:id/delete', restricted, async (req, res) => {
  let { id } = req.params;

  try {
    const service = await Service.findAll({ where: { id: id }});
    if (service) {
      const deletedService = await Service.update({
        deletedAt: new Date()}, {
          where: { id: id }
      })
      if (deletedService) {
        const services = await Service.findAll({ where: { deletedAt: null }});
        res.status(202).json(services)
      } else res.status(500).json({ err: 'Could not delete service' })
    } else res.status(404).json({ err: 'No user found'})
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })};
});

// --------------
// CREATE SERVICE
// --------------
servicesRouter.post('/', restricted, async (req, res) => {
  const { body } = req;

  if (body) {
    body.deletedAt = null;

    try {
      await Service.sync();
      const service = await Service.create(body);
      if (service) {
        const services = await Service.findAll({ where: { deletedAt: null }});
        res.status(201).json(services)
      } else res.status(406).json({ err: 'Server Error, service not accepted' })
    } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
  } else res.status(406).json({ err: 'Missing reqest body', err })
});

module.exports = servicesRouter;