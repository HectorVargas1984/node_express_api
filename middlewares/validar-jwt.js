const { request, response } = require("express");
const { Usuario } = require("./../models/usuario");
const jwt = require("jsonwebtoken");

const validarJWT = async (req = request, res = response, next) => {
  // de esta manera tomo el token como Bearer token
  const token = req.headers.authorization.replace("Bearer ", "");

  console.log(token);

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.uid = uid;

    // validando el usuario estado y si existe en la BD
    const usuario = await Usuario.findByPk(uid, {
      attributes: ["id", "nombre", "role", "estado"],
    });

    if (!usuario) {
      return res.status(401).json({
        status: "no OK",
        msg: `Token no valido - usuario no existe en la base de datos`,
      });
    }

    if (!usuario.estado) {
      return res.status(401).json({
        status: "no OK",
        msg: `Token no valido - usuario estado en: ${usuario.estado}`,
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.warn(error);
    return res.status(401).json({
      status: "no OK",
      msg: "Token no valido",
    });
  }
};

module.exports = { validarJWT };
