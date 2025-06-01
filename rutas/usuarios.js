const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  iniciarSesion
} = require('../controladores/usuariosControlador');


router.post('/registrar', registrarUsuario);


router.post('/login', iniciarSesion);

module.exports = router;
