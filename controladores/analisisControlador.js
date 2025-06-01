const conexion = require('../db');


const obtenerPromedios = (req, res) => {
  const { usuario_id } = req.params;

  const consulta = `
    SELECT 
      AVG(CASE WHEN tipo = 'ingreso' THEN valor END) AS promedio_ingresos,
      AVG(CASE WHEN tipo = 'egreso' THEN valor END) AS promedio_egresos
    FROM transacciones
    WHERE usuario_id = ?
  `;

  conexion.query(consulta, [usuario_id], (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener promedios' });
    res.status(200).json(resultados[0]);
  });
};


const obtenerPorcentajeAhorro = (req, res) => {
  const { usuario_id } = req.params;

  const consulta = `
    SELECT 
      (SUM(CASE WHEN tipo = 'ingreso' THEN valor ELSE 0 END) -
       SUM(CASE WHEN tipo = 'egreso' THEN valor ELSE 0 END)) /
       SUM(CASE WHEN tipo = 'ingreso' THEN valor ELSE 1 END) * 100
       AS porcentaje_ahorro
    FROM transacciones
    WHERE usuario_id = ?
  `;

  conexion.query(consulta, [usuario_id], (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener porcentaje de ahorro' });
    res.status(200).json(resultados[0]);
  });
};


const obtenerGastoPorCategoria = (req, res) => {
  const { usuario_id } = req.params;

  const consulta = `
    SELECT c.nombre AS categoria, AVG(t.valor) AS promedio
    FROM transacciones t
    JOIN categorias c ON t.categoria_id = c.id
    WHERE t.tipo = 'egreso' AND t.usuario_id = ?
    GROUP BY c.nombre
  `;

  conexion.query(consulta, [usuario_id], (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener gasto por categoría' });
    res.status(200).json(resultados);
  });
};


const obtenerRelacionIngresosEgresos = (req, res) => {
  const { usuario_id } = req.params;

  const consulta = `
    SELECT 
      SUM(CASE WHEN tipo = 'ingreso' THEN valor ELSE 0 END) AS total_ingresos,
      SUM(CASE WHEN tipo = 'egreso' THEN valor ELSE 0 END) AS total_egresos,
      (SUM(CASE WHEN tipo = 'ingreso' THEN valor ELSE 0 END) -
       SUM(CASE WHEN tipo = 'egreso' THEN valor ELSE 0 END)) AS balance
    FROM transacciones
    WHERE usuario_id = ?
  `;

  conexion.query(consulta, [usuario_id], (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener relación ingresos/egresos' });
    res.status(200).json(resultados[0]);
  });
};

module.exports = {
  obtenerPromedios,
  obtenerPorcentajeAhorro,
  obtenerGastoPorCategoria,
  obtenerRelacionIngresosEgresos
};
