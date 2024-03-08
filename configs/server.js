'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import categoryRoutes from '../src/categories/category.routes.js';
import productRoutes from '../src/products/product.routes.js';
import { getOutOfStockProducts } from '../src/products/product.controller.js';
import { getBestSellingProducts } from '../src/products/product.controller.js';
import { searchProductsByName } from '../src/products/product.controller.js';
import { searchProductsByCategory } from '../src/products/product.controller.js';
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/ventasAPI/v1/users';
        this.authPath = '/ventasAPI/v1/auth';
        this.categoryPath = '/ventasAPI/v1/category';
        this.productPath = '/ventasAPI/v1/product'
        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.get('/ventasAPI/v1/out-of-stock-products', getOutOfStockProducts);
        this.app.get('/ventasAPI/v1/best-selling-products', getBestSellingProducts);
        this.app.get('/ventasAPI/v1/products/search/:name', searchProductsByName);
        this.app.get('/ventasAPI/v1/categories/:categoryName', searchProductsByCategory);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;