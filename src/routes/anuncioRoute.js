const express = require('express');

const router = express.Router();

const controller = require('../controllers/anuncioController')
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.get('/:id', controller.get);
router.get('/', controller.list);
router.get('/fotos/:id', controller.getFoto);
router.get('/opcionais/:id', controller.getOpcionais);
router.put('/:id', controller.putScore);
router.put('/activate/:id', controller.activate);
router.put('/deactivate/:id', controller.deactivate);
router.put('/adiciona_foto/:id', controller.addFoto);
router.put('/adiciona_opcional/:id', controller.addOpcional);

module.exports = router;