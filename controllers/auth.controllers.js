const { request, response } = require("express");
const bcryotjs = require("bcryptjs");
const { Usuario } = require("./../models/usuario");
const { generadorJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // consultar si un usuario esta activo
    const conEstado = { email: email, estado: true };
    const usuarioActivo = await Usuario.findOne({
      attributes: ["id", "nombre", "role", "password"],
      where: conEstado,
    });

    console.log("usuarioActivo", usuarioActivo);

    if (usuarioActivo == null) {
      return res.status(400).json({
        status: "No OK",
        msg: `El usuario ${email} no esta activo`,
      });
    }

    // validarion del password
    const validarPassword = bcryotjs.compareSync(
      password,
      usuarioActivo.dataValues.password
    );

    if (!validarPassword) {
      return res.status(400).json({
        status: "No OK",
        msg: `La contraseña ${email}, no es valida`,
      });
    }

    // generar un token

    const token = await generadorJWT(usuarioActivo.dataValues.id);

    res.json({
      status: "OK",
      msg: "Login Ok",
      token,
      usuario: {
        nombre: usuarioActivo.dataValues.nombre,
        role: usuarioActivo.dataValues.role,
      },
    });
  } catch (error) {
    console.warn(error);
    res.status(500).json({
      status: "No OK",
      msg: "Error en la base de datos",
    });
  }
};

module.exports = { login };
