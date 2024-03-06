import { Router } from "express";
import { check } from "express-validator";
import {
  usersGet,
  usersPost,
  getUserById,
  usersPut,
  usersDelete,
} from "./user.controller.js";
import {
    existsEmail,
  /*esRoleValido,*/
  existsUserById,
} from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";
/*import { tieneRole } from "../middlewares/validar-roles.js";*/
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/", usersGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserById),
    validateFields,
  ],
  getUserById
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "Este no es un correo válido").isEmail(),
    check("correo").custom(existsEmail),
    /*check("role").custom(esRoleValido),*/
    validateFields,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserById),
    validateFields,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserById),
    validateFields,
  ],
  usersDelete
);

export default router;