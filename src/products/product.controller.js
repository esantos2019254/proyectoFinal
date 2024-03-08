import { response, request } from "express";
import Product from './product.model.js';

export const productsGet = async (req = request, res = response) => {

    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate({
                path: 'category',
                select: 'name -_id'
            })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        products
    });
}

export const getOutOfStockProducts = async (req, res) => {
    try {
        const outOfStockProducts = await Product.findOutOfStockProducts();

        res.status(200).json({
            total: outOfStockProducts.length,
            outOfStockProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getBestSellingProducts = async (req, res) => {
    try {
        const bestSellingProducts = await Product.find().sort({ quantitySold: -1 });

        res.status(200).json({
            total: bestSellingProducts.length,
            bestSellingProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getProductById = async (req, res) => {

    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        product
    });
}

export const productsPost = async (req, res) => {

    const { name, price, quantityStock, quantitySold, category } = req.body;
    const product = new Product({ name, price, quantityStock, quantitySold, category });

    await product.save();

    res.status(200).json({
        product
    });

}

export const productsPut = async (req, res) => {

    const { id } = req.params;
    const { _id, state, ...resto } = req.body;

    await Product.findByIdAndUpdate(id, resto);
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        msg: 'Product Updated Successfully',
        product
    });
}

export const productsDelete = async (req, res) => {

    const { id } = req.params;

    await Product.findByIdAndUpdate(id, { state: false });
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        msg: 'Product Delete Successfully',
        product
    });
}