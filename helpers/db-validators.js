const Roles = require("../models/roles");
const { Usuario } = require("../models/usuario");
const { where } = require("sequelize");

// validador de roles
const esRoleValido = async (role = "") => {
  const exiteRol = await Roles.findOne({ where: { role } });

  if (!exiteRol) {
    throw new Error(`El rol ${role} no esta registrado en la base de datos`);
  }
};

//Validador de correo
const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ where: { email } });

  if (existeEmail) {
    throw new Error(`El e-mail ${email} ya existe en la base de datos`);
  }
};

const emailExisteLogin = async (email = "") => {
  const existeEmail = await Usuario.findOne({ where: { email } });

  if (!existeEmail) {
    throw new Error(`El e-mail ${email} no exixte en la base de datos`);
  }
};

//Valida el id
const idExiste = async (id = "") => {
  const idusuario = await Usuario.findByPk(id);

  if (!idusuario) {
    throw new Error(`El id ${id} no existe en en la Base de datos`);
  }
};

// estado del usuario valido (true)
// const estadoValido = async (id = "") => {
//   const estado = await Usuario.findByPk(id, {
//     attributes: ["estado", "nombre"],
//   });
//   console.log("estado", estado);
// };

module.exports = {
  esRoleValido,
  emailExiste,
  idExiste,
  emailExisteLogin,
};
