import { response, request } from "express";
import Invoice from './invoice.model.js';
import ShoppingCart from '../cart/cart.model.js'; // Importa el modelo de carrito de compras si no lo has hecho aún
import Product from '../products/product.model.js';

// Función para obtener el precio de un producto dado su ID
const getProductPrice = async (productId) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product.price;
    } catch (error) {
        console.error(`Error fetching product price: ${error.message}`);
        throw error;
    }
};

export const generateInvoice = async (req, res) => {
    try {
        const { userId, shoppingCartId } = req.body;

        // Verifica si el carrito de compras existe
        const cart = await ShoppingCart.findById(shoppingCartId);

        if (!cart) {
            return res.status(404).json({ error: "Shopping cart not found" });
        }

        // Verificar y actualizar el stock de cada producto en el carrito
        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            if (product.quantityStock < item.quantity) {
                return res.status(400).json({ error: "Insufficient stock for product: " + product.name });
            }

            // Actualizar el stock del producto
            product.quantityStock -= item.quantity;
            // Incrementar el stock del producto vendido
            product.quantitySold += item.quantity;

            await product.save();
        }

        const cartWithTotalPrices = await Promise.all(cart.items.map(async (item) => {
            const productPrice = await getProductPrice(item.product);
            return {
                ...item.toObject(),
                totalPrice: productPrice * item.quantity
            };
        }));

        // Calcular el monto total de la factura
        const totalAmount = cart.totalPrice;

        // Crear la factura
        const invoice = new Invoice({
            user: userId,
            shoppingCart: shoppingCartId,
            items: cartWithTotalPrices,
            totalAmount: totalAmount,
        });

        // Guardar la factura en la base de datos
        await invoice.save();

        res.status(200).json({ msg: "Invoice generated successfully", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const invoicesGetByUser = async (req = request, res = response) => {
    try {
        const { userId } = req.params;

        const invoices = await Invoice.find({ user: userId });

        res.status(200).json({ invoices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const invoiceGetById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id);

        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        res.status(200).json({ invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const invoiceUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { items } = req.body;

        // Validar el stock antes de actualizar la factura
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            if (product.quantityStock < item.quantity) {
                return res.status(400).json({ error: `Insufficient stock for product: ${product.name}` });
            }
        }

        const invoice = await Invoice.findByIdAndUpdate(id, { items }, { new: true });

        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        res.status(200).json({ msg: "Invoice updated", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const invoiceDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByIdAndDelete(id);

        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        res.status(200).json({ msg: "Invoice deleted", invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}