import productRoutes from '../routes/product.routes.js';

export  const getProducts= async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, data: products });
    } catch(error) {
        console.error("Error in get products", error.message);
        res.status(500).json({ success: false, message: "server Error" });

    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.imagine) {
        return res.status(400).json({ success: false, message: "please provide all data" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product", error.message);
        res.status(500).json({ success: false, message: "server Error" });
    }
}

import Product from "../module/product.model.js";

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;

        if (!product.name || !product.price || !product.imagine) {
            return res.status(400).json({ success: false, message: "please provide all data" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in update product", error.message);
        res.status(500).json({ success: false, message: "server Error" });
    }  
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: "product deleted" });
    } catch (error) {
        console.error("Error in delete product", error.message);
        res.status(500).json({ success: false, message: "server Error" });
    }
}
