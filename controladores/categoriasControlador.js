const conexion = require('../db');


const crearCategoria = (req, res) => {
  const { nombre, usuario_id } = req.body;

  const insertar = 'INSERT INTO categorias (nombre, usuario_id) VALUES (?, ?)';
  conexion.query(insertar, [nombre, usuario_id], (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al crear categoría' });
    res.status(201).json({ mensaje: 'Categoría creada exitosamente' });
  });
};

const eliminarCategoria = (req, res) => {
  const { id } = req.params;

  const eliminar = 'DELETE FROM categorias WHERE id = ?';
  conexion.query(eliminar, [id], (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar categoría' });
    res.status(200).json({ mensaje: 'Categoría eliminada exitosamente' });
  });
};


const obtenerCategorias = (req, res) => {
  const { usuario_id } = req.params;

  const consulta = 'SELECT * FROM categorias WHERE usuario_id = ?';
  conexion.query(consulta, [usuario_id], (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener categorías' });
    res.status(200).json(resultados);
  });
};

module.exports = {
  crearCategoria,
  eliminarCategoria,
  obtenerCategorias
};
