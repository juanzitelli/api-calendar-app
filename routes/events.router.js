const { Router } = require("express");
const { validarJWT } = require("./../middlewares/validar-jwt.middleware");
const { check } = require("express-validator");
const { validarCampos } = require("./../middlewares/validar-campos.middleware");
const { isDate } = require("../helpers/isDate");

const {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events.controller");
const router = Router();

router.use(validarJWT);

router.get("/", obtenerEventos);
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

module.exports = router;
