const express = require('express');
const { restricted } = require('../../auth/authenticate.js');
const Merch = require('../../models/merch.js');
const { sync } = require('../../models/users.js');
const storeRouter = express.Router();

// ----------------
// GET ALL PRODUCTS
// ----------------
storeRouter.get('/', async (req, res) => {
  try {
    const products = await Merch.findAll({ where: { deletedAt: null }});
    if (products) res.status(200).json(products)
    else res.status(404).json({ err: 'No products found' })
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
});

// -----------------
// GET PRODUCT BY ID
// -----------------
storeRouter.get('/:id', async (req, res) => {
  let { id } = req.params;

  try {
    const product = await Merch.findAll({ where: { id: id }});
    if (product) res.status(200).json(product)
    else res.status(404).json({ err: 'No product found with this ID' })
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
});

// ------------------
// EDIT PRODUCT BY ID
// ------------------
storeRouter.put('/:id', restricted, async (req, res) => {
  let { id } = req.params;
  let { body } = req;

  try {
    const product = await Merch.findAll({ where: { id: id }});
    if (product) {
      const editProduct = await Merch.update(body, { where: { id: id }});
      if (editProduct) {
        const products = await Merch.findAll({ where: { deletedAt: null }});
        res.status(202).json(products);
      } else res.status(500).json({ err: 'Server Error, Could not update product' })
    } else res.status(404).json({ err: 'Product not found' })
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
});

// --------------------
// DELETE PRODUCT BY ID
// --------------------
storeRouter.put('/:id/delete', restricted, async (req, res) => {
  let { id } = req.params;

  try {
    const product = await Merch.findAll({ where: { id: id }});
    if (product) {
      const deletedProduct = await Merch.update({
        deletedAt: new Date()}, {
          where: { id: id }
      })
      if (deletedProduct) {
        const products = await Merch.findAll({ where: { deletedAt: null }});
        res.status(202).json(products)
      } else res.status(500).json({ err: 'Could not delete product' })
    } else res.status(404).json({ err: 'No product found'})
  } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })};
});

// --------------
// CREATE PRODUCT
// --------------
storeRouter.post('/', restricted, async (req, res) => {
  const { body } = req;

  if (body) {
    body.quantity = 1;
    body.deletedAt = null;
    await Merch.sync()
    try {
      const product = await Merch.create(body);
      if (product) {
        const products = await Merch.findAll({ where: { deletedAt: null }});
        res.status(201).json(products)
      } else res.status(406).json({ err: 'Server Error, product not accepted' })
    } catch (err) { res.status(500).json({ err: 'Internal Server Error', err })}
  } else res.status(406).json({ err: 'Missing reqest body', err })
});

module.exports = storeRouter;