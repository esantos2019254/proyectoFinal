import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt.js";
import {
    invoicesGetByUser,
    generateInvoice,
    invoiceGetById,
    invoiceUpdate,
    invoiceDelete
} from "./invoice.controller.js";
import { validateRolActions } from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    "/", 
    validateJWT,
    generateInvoice
);

router.get(
    "/:userId", 
    validateJWT,
    invoicesGetByUser
);


router.get(
    "/:id", 
    validateJWT,
    validateRolActions,
    invoiceGetById
);

router.put(
    "/:id", 
    validateJWT,
    validateRolActions,
    invoiceUpdate
);

router.delete(
    "/:id",
    validateJWT,
    validateRolActions,
    invoiceDelete);

export default router;