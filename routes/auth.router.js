const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controllers");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExisteLogin } = require("../helpers/db-validators");
const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("email").custom((email) => emailExisteLogin(email)),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
