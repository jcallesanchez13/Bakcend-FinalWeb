const express = require('express');
const router = express.Router();
const analisisControlador = require('../controladores/analisisControlador');


router.get('/promedios/:usuario_id', analisisControlador.obtenerPromedios);

router.get('/porcentaje-ahorro/:usuario_id', analisisControlador.obtenerPorcentajeAhorro);


router.get('/gasto-categoria/:usuario_id', analisisControlador.obtenerGastoPorCategoria);


router.get('/relacion/:usuario_id', analisisControlador.obtenerRelacionIngresosEgresos);

module.exports = router;
