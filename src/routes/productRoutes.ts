import express from 'express';
import productController from '@controllers/productController';

const { getProducts, getProductById, createProduct, updateProduct, deleteProduct} = productController;

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
