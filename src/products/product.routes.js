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
    searchProductsByName,
    searchProductsByCategory
} from "./product.controller.js";
import {
    existsProductById,
} from "../helpers/db-validators.js";
import { validateFields, validateRolActions } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/",
    productsGet
);

router.get(
    "/out-of-stock-products",
    [
        validateJWT,
        validateRolActions,
    ],
    getOutOfStockProducts
);

router.get('/:best-selling-products',
    validateJWT,
    getBestSellingProducts
);

router.get('/search/:name',
    searchProductsByName
);

router.get("/categories/:categoryName", 
    searchProductsByCategory
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