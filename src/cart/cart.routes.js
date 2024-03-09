import { Router } from "express";
import { check } from "express-validator";
import {
    cartsGet,
    getCartById,
    cartsPut,
    cartsDelete,
    addToCart
} from "./cart.controller.js";
import {
    existsCartById,
} from "../helpers/db-validators.js";
import { validateFields, validateRolActions } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/",
    cartsGet
);

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsCartById),
        validateRolActions,
        validateFields,
    ],
    getCartById
);

router.post(
    "/add-to-cart",
    [
        validateJWT,
        check("userId", "User ID is required").not().isEmpty(),
        check("productId", "Product ID is required").notEmpty(),
        check("quantity", "Quantity is required").isInt({ min: 1 }),
        validateFields,
    ],
    addToCart
);

router.put(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsCartById),
        validateFields,
    ],
    cartsPut
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsCartById),
        validateFields,
    ],
    cartsDelete
);

export default router;