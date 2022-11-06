import { Router, Request, Response } from 'express';

import ProductController from '../controller/ProductController';

const productRoutes = Router();

const productController = new ProductController();

productRoutes.post('/', productController.create);
productRoutes.patch('/', productController.update);
productRoutes.get('/search/property/:name/:id', productController.searchAndProperty);
productRoutes.get('/search/:name', productController.search);
productRoutes.get('/property/:id', productController.findByProperty);
productRoutes.get('/:id', productController.find);
productRoutes.delete('/:id', productController.delete);
productRoutes.get('/', productController.index);

export default productRoutes;
