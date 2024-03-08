import { Router } from "express";
import { check } from "express-validator";
import {
    productsGet,
    productsPost,
    getProductById,
    productsPut,
    productsDelete,
    getOutOfStockProducts,
    getBestSellingProducts,
    searchProductsByName
} from "./product.controller.js";
import {
    existsProductById,
} from "../helpers/db-validators.js";
import { validateFields, validateRolActions } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/",
    validateJWT,
    productsGet
);

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsProductById),
        validateRolActions,
        validateFields,
    ],
    getProductById
);

router.get(
    "/:out-of-stock-products",
    validateJWT,
    validateRolActions,
    getOutOfStockProducts
);

router.get('/:best-selling-products',
    getBestSellingProducts
);

router.get('/:products/search/:name',
    searchProductsByName
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validateRolActions,
        validateFields,
    ],
    productsPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsProductById),
        validateRolActions,
        validateFields,
    ],
    productsPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsProductById),
        validateRolActions,
        validateFields,
    ],
    productsDelete
);

export default router;