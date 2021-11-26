const express = require('express');
const { restricted } = require('../../auth/authenticate.js');
const Photographer = require('../../models/photographers.js');
const photographersRouter = express.Router();

// ---------------------
// GET ALL PHOTOGRAPHERS
// ---------------------
photographersRouter.get('/', async (req, res) => {
  try {
    const photographers = await Photographer.findAll({ where: { deletedAt: null }});
    if (photographers) res.status(200).json(photographers)
    else res.status(404).json({ err: 'No Photographers found' })
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
});

// ----------------------
// GET PHOTOGRAPHER BY ID
// ----------------------
photographersRouter.get('/:id', async (req, res) => {
  let { id } = req.params;

  try {
    const photographer = await Photographer.findAll({ where: { id: id }});
    if (photographer) res.status(200).json(photographer)
    else res.status(404).json({ err: 'Photographer not found with this ID' })
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
});

// -----------------------
// EDIT PHOTOGRAPHER BY ID
// -----------------------
photographersRouter.put('/:id', restricted, async (req, res) => {
  let { id } = req.params;
  let { body } = req;

  try {
    const photographer = await Photographer.findAll({ where: { id: id }});
    if (photographer) {
      const editPhotographer = await Photographer.update(body, { where: { id: id }});
      if (editPhotographer) {
        const photographers = await Photographer.findAll({ where: { deletedAt: null }});
        res.status(202).json(photographers);
      } else res.status(500).json({ err: 'Server Error, Could not update photographer' })
    } else res.status(404).json({ err: 'Photographer not found' })
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
});

// -------------------------
// DELETE PHOTOGRAPHER BY ID
// -------------------------
photographersRouter.put('/:id/delete', restricted, async (req, res) => {
  let { id } = req.params;
  let { body } = req;

  try {
    const photographer = await Photographer.findAll({ where: { id: id }});
    if (photographer) {
      const deletedPhotographer = await Photographer.update({
        deletedAt: body }, {
          where: { id: id }
      })
      if (deletedPhotographer) {
        const photographers = await Photographer.findAll({ where: { deletedAt: null }});
        res.status(202).json(photographers)
      } else res.status(500).json({ err: 'Could not delete service' })
    } else res.status(404).json({ err: 'No user found'})
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })};
});

// -------------------
// CREATE PHOTOGRAPHER
// -------------------
photographersRouter.post('/', restricted, async (req, res) => {
  const { body } = req;

  if (body) {
    body.quantity = 1;

    try {
      await Photographer.sync()
      const photographer = await Photographer.create(body);
      if (photographer) {
        const photographers = await Photographer.findAll({ where: { deletedAt: null }});
        res.status(201).json(photographers)
      } else res.status(406).json({ err: 'Server Error, service not accepted' })
    } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
  } else res.status(406).json({ err: 'Missing reqest body', err })
});

module.exports = photographersRouter;