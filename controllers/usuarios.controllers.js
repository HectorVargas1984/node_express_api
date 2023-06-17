const { response, request } = require("express");
const { Usuario } = require("./../models/usuario");
const bcryotjs = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, page = 0 } = req.query;

  const offset = (page - 1) * limite;

  const estado = { estado: true };

  try {
    const usuarios = await Usuario.findAll({
      where: estado,
      limit: Number(limite),
      offset: offset,
    });

    if (usuarios) {
      res.status(200).json({
        status: "OK",
        totalRegistros: usuarios.length,
        data: usuarios,
      });
    } else {
      res.status(404).json({
        status: "OK",
        msg: "No hay usuarios que monstrar",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "ocurrio un error en la base de datos",
    });
  }
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

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const estado = { estado: false };

  try {
    await Usuario.update(estado, { where: { id: id } });

    res.status(200).json({
      status: "OK",
      msg: `El usuario id: ${id}, a sido dado de baja`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "ocurrio un error en la base de datos",
    });
  }
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
