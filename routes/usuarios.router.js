const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios.controllers");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRoleValido,
  emailExiste,
  idExiste,
} = require("../helpers/db-validators");

const router = Router();

// URI
router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id").custom((id) => idExiste(id)),
    check("role").custom((role) => esRoleValido(role)),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El email no es valido").isEmail(),
    check("email").custom((email) => emailExiste(email)),
    //check("role", "no es un rol valido").isIn(["ADMIN", "USER"]),
    check("role").custom((role) => esRoleValido(role)),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/:id", usuariosDelete);

module.exports = router;
