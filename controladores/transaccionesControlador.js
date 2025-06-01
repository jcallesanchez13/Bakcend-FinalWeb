const conexion = require('../db');


const registrarTransaccion = (req, res) => {
  const { tipo, valor, categoria_id, usuario_id, descripcion } = req.body;

  const insertar = `
    INSERT INTO transacciones (tipo, valor, categoria_id, usuario_id, descripcion)
    VALUES (?, ?, ?, ?, ?)
  `;
  conexion.query(insertar, [tipo, valor, categoria_id, usuario_id, descripcion], (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al registrar transacción' });
    res.status(201).json({ mensaje: 'Transacción registrada exitosamente' });
  });
};


const obtenerTransacciones = (req, res) => {
  const { usuario_id } = req.params;

  const consulta = `
    SELECT t.*, c.nombre AS categoria
    FROM transacciones t
    JOIN categorias c ON t.categoria_id = c.id
    WHERE t.usuario_id = ?
    ORDER BY t.fecha DESC
  `;
  conexion.query(consulta, [usuario_id], (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener transacciones' });
    res.status(200).json(resultados);
  });
};

const eliminarTransaccion = (req, res) => {
  const id = req.params.id;
  const consulta = 'DELETE FROM transacciones WHERE id = ?';
  db.query(consulta, [id], (error, resultado) => {
    if (error) {
      res.status(500).json({ mensaje: 'Error al eliminar transacción', error });
    } else {
      res.status(200).json({ mensaje: 'Transacción eliminada correctamente' });
    }
  });
};
module.exports = {
  registrarTransaccion,
  obtenerTransacciones,
  eliminarTransaccion
};

