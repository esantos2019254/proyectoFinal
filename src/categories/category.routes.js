import { Router } from "express";
import { check } from "express-validator";
import {
    categoriesGet,
    categoriesPost,
    getCategoryById,
    categoriesPut,
    categoriesDelete,
} from "./category.controller.js";
import {
    esRoleValido,
    existsCategoryById,
} from "../helpers/db-validators.js";
import { validateFields, validateRolActions } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/", categoriesGet);

router.get(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsCategoryById),
        validateFields,
    ],
    getCategoryById
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validateRolActions,
        validateFields,
    ],
    categoriesPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsCategoryById),
        validateRolActions,
        validateFields,
    ],
    categoriesPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsCategoryById),
        validateRolActions,
        validateFields,
    ],
    categoriesDelete
);

export default router;