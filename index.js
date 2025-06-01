const express = require('express');
const cors = require('cors');

const app = express();
const puerto = 3000;


app.use(cors());
app.use(express.json());


const rutasUsuarios = require('./rutas/usuarios');
const rutasCategorias = require('./rutas/categorias');
const rutasTransacciones = require('./rutas/transacciones');
const rutasAnalisis = require('./rutas/analisis');

app.use('/usuarios', rutasUsuarios);
app.use('/categorias', rutasCategorias);
app.use('/transacciones', rutasTransacciones);
app.use('/analisis', rutasAnalisis);


app.get('/', (req, res) => {
  res.send('Servidor backend de Finanzas Personales funcionando correctamente.');
});


app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

