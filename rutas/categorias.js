const express = require('express');
const router = express.Router();
const {
  crearCategoria,
  eliminarCategoria
} = require('../controladores/categoriasControlador');


router.post('/', crearCategoria);


router.delete('/:id', eliminarCategoria);

module.exports = router;
