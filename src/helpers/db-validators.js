import User from '../users/user.model.js';
import Category from '../categories/category.model.js';
import Product from '../products/product.model.js';
import Cart from "../cart/cart.model.js";

export const esRoleValido = async (role = '') => {
    const existeRol = await User.findOne({role});
    if (!existeRol){
        throw new Error(`El role ${role} no existe en la base datos`);
    }
}

export const existsEmail = async (email = '') => {

    const existsEmail = await User.findOne({email});

    if(existsEmail){
        throw new Error(`The email ${email} has already been registered`);
    }
}

export const existsUserById = async (id = '') => {
    
    const existsUser = await User.findById(id);
    
    if(!existsUser){
        throw new Error(`The ID: ${id} does not exist`);
    }
}

export const existsCategoryById = async (id = '') => {
    
    const existsCategory = await Category.findById(id);
    
    if(!existsCategory){
        throw new Error(`The ID: ${id} does not exist`);
    }
}

export const existsProductById = async (id = '') => {
    
    const existsProduct = await Product.findById(id);
    
    if(!existsProduct){
        throw new Error(`The ID: ${id} does not exist`);
    }
}

export const existsCartById = async (id = '') => {
    
    const existsCart = await Cart.findById(id);
    
    if(!existsCart){
        throw new Error(`The ID: ${id} does not exist`);
    }
}
