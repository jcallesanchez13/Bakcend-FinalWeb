const conexion = require('../db');


const registrarUsuario = (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  const verificarCorreo = 'SELECT * FROM usuarios WHERE correo = ?';
  conexion.query(verificarCorreo, [correo], (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });

    if (resultados.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const insertar = 'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)';
    conexion.query(insertar, [nombre, correo, contraseña], (err) => {
      if (err) return res.status(500).json({ mensaje: 'Error al registrar' });
      res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    });
  });
};


const iniciarSesion = (req, res) => {
  const { correo, contraseña } = req.body;

  const consulta = 'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?';
  conexion.query(consulta, [correo, contraseña], (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });

    if (resultados.length === 0) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario: resultados[0] });
  });
};

module.exports = {
  registrarUsuario,
  iniciarSesion
};
