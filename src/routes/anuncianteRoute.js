const express = require('express');

const router = express.Router();

const controller = require('../controllers/anuncianteController')
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.get('/:id', controller.get);
router.get('/', controller.list);

module.exports = router;