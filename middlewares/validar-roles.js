const { response, request } = require("express");

const esAdminRole = (req = request, res = response) => {
  if (!req.usuario) {
    return res.status(500).json({
      status: "no OK",
      msg: "Se quiere verificar el role sin validar token",
    });
  }

  const { role, nombre } = req.usuario;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      status: "no Ok",
      msg: `el usuario: ${nombre}, no es administrador - no puedo hacer estas opcion`,
    });
  }

  next();
};

module.exports = {
  esAdminRole,
};
