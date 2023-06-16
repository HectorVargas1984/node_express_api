const { response, request } = require("express");
const { Usuario } = require("./../models/usuario");
const bcryotjs = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const usuariosGet = (req = request, res = response) => {
  const queryParams = req.query;

  res.json({
    msg: "get API - controlador",
    queryParams,
  });
};

const usuariosPost = async (req = request, res = response) => {
  let { nombre, email, password, role } = req.body;
  let pass;
  let id = uuidv4();

  //encriptacion de la password
  const salt = bcryotjs.genSaltSync();
  pass = bcryotjs.hashSync(password, salt);
  password = pass;

  try {
    // creando un usuario en la dase de datos
    const nuevoUsuarios = await Usuario.create({
      id,
      nombre,
      email,
      password,
      role,
    });
    res.status(201).json({
      status: "OK",
      msg: `Usuario ${nuevoUsuarios.getDataValue("nombre")}, creado con exito`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "ocurrio un error en la base de datos",
    });
  }
};

const usuariosPut = async (req = request, res = response) => {
  const idDb = req.params.id;

  let { id, password, google, ...resto } = req.body;

  let modelAtri;

  await Usuario.describe().then((atributos) => {
    const atributosModelo = Object.keys(atributos);
    modelAtri = Object.keys(resto).filter((f) => !atributosModelo.includes(f));
  });

  // validadondo vienen atributos no valido en el body, que no pertenecen a modelo de la tabla
  if (modelAtri.length > 0) {
    return res.status(400).json({
      status: "no OK",
      msg: `se encontratron atributos no validos en el modelo ${modelAtri}`,
    });
  }

  //actualizando password por si vienen
  if (password) {
    //encriptacion de la password
    const salt = bcryotjs.genSaltSync();
    resto.password = bcryotjs.hashSync(password, salt);
  }

  try {
    await Usuario.update(resto, { where: { id: idDb } });

    res.status(201).json({
      status: "OK",
      msg: `Usuario ${id}, actualizado con exito`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "ocurrio un error en la base de datos",
    });
  }
};

const usuariosDelete = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "delete API - controlador",
    id,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
