const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos.middleware");
const { validarJWT } = require("./../middlewares/validar-jwt.middleware");
/**
 * Rutas de usuarios / auth
 * host + /api/auth
 */

router.post(
  "/new",
  [
    [check("name", "El nombre es obligatorio").not().isEmpty()],
    [check("email", "El email es obligatorio y debe ser válido").isEmail()],
    [
      check(
        "password",
        "La contraseña es obligatoria y debe tener longitud mayor a 6 caracteres"
      ).isLength({ min: 6 }),
    ],
  ],
  validarCampos,
  crearUsuario
);

router.post(
  "/",
  [
    [check("email", "El email es obligatorio y debe ser válido").isEmail()],
    [
      check(
        "password",
        "La contraseña es obligatoria y debe tener longitud mayor a 6 caracteres"
      ).isLength({ min: 6 }),
    ],
  ],
  validarCampos,
  loginUsuario
);
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
