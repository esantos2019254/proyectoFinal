import { response, request } from "express";
import Category from './category.model.js';

export const categoriesGet = async (req = request, res = response) => {

    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categories
    });
}

export const getCategoryById = async (req, res) => {

    const { id } = req.params;
    const category = await Category.findOne({ _id: id });

    res.status(200).json({
        category
    });
}

export const categoriesPost = async (req, res) => {
    
    const { name } = req.body;
    const category = new Curso({ name });

    await category.save();

    res.status(200).json({
        category
    });

}

export const categoriesPut = async (req, res) => {

    const { id } = req.params;
    const { _id, state, ...resto } = req.body;

    await Category.findByIdAndUpdate(id, resto);
    const category = await Category.findOne({ _id: id });

    res.status(200).json({
        msg: 'Category Updated Successfully',
        category
    });
}

export const categoriesDelete = async (req, res) => {

    const { id } = req.params;

    await Category.findByIdAndUpdate(id, { state: false });
    const category = await Category.findOne({ _id: id });

    res.status(200).json({
        msg: 'Category Delete Successfully',
        category
    });
}