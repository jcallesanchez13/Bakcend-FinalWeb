const express = require('express');
const router = express.Router();
const controladorTransacciones = require('../controladores/transaccionesControlador');


router.post('/', controladorTransacciones.registrarTransaccion);

router.get('/', controladorTransacciones.obtenerTransacciones);

router.delete('/:id', controladorTransacciones.eliminarTransaccion);

module.exports = router;
