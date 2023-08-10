const express = require('express');

const router = express.Router();

const controller = require('../controllers/opcionalVeiculoController')
router.post('/', controller.post);
router.get('/', controller.list);

module.exports = router;