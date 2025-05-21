import express from 'express';
import { get } from 'mongoose';
import { createProduct, getProducts,updateProduct,deleteProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.patch('/:id',updateProduct );
router.post('/', createProduct);
router.delete('/:id',deleteProduct );

export default router;
