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
    esRoleValido,
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
        check("email", "Este no es un correo válido").isEmail(),
        check("email").custom(existsEmail),
        validateFields,
    ],
    usersPost
);

router.put(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsUserById),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({
            min: 6,
        }),
        check("role").custom(esRoleValido),
        validateFields,
    ],
    usersPut
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsUserById),
        validateFields,
    ],
    usersDelete
);

export default router;