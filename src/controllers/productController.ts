import { Request, Response } from 'express';
import ProductService from '@services/productService';
import { validateProductCreateData, validateProductUpdateData } from '@/utils/validations';

async function getProducts (req: Request, res: Response) {
    try {
        const { brand, stockover, stockbelow, discountover, discountbelow, expireover, expirebelow } = req.query
        const products = await ProductService.getAllProducts(
            brand as string,
            stockover as string, 
            stockbelow as string,
            discountover as string,
            discountbelow as string,
            expireover as string,
            expirebelow as string
        );
        return res.json(products);
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            "message": "Error getting products"
        })
    }
}

async function getProductById (req: Request, res: Response) {
    try {
        const id = req.params.id
        const product = await ProductService.getById(+id)
        if(!product) {
            return res.status(404).send({
                "message": "Product not found"
            })
        }
        return res.json(product)
                
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            "message": "Error getting product"
        })
    }
}

async function createProduct (req: Request, res: Response) {
    const data = req.body;
    const { error } = validateProductCreateData(data)
    if(error) {
        return res.status(400).send({
            "message": error.details[0].message,
            "status": false
        })
    }
    try {
        const product = await ProductService.createProduct(data)
        return res.status(201).json({
            "message": "Product successfully created",
            "status": true,
            "Product": product
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            "message": "Error creating product"
        })
    }
}

async function updateProduct (req: Request, res: Response) {
    const data = req.body;
    
    const { error } = validateProductUpdateData(data)
    if(error) {
        return res.status(400).send({
            message: error.details[0].message,
            status: false
        })
    }
    try {
        const productId = req.params.id;
        let product = await ProductService.getById(+productId);
        if(!product) {
            return res.status(404).send({
                "message": "Product not found"
            })
        }
        product = await ProductService.updateProduct(+productId, data);
        return res.status(200).json({
            "message": "Product successfully updated",
            "status": true,
            "Product": product
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            "message": "Error updating product"
        })
    }
}

async function deleteProduct (req: Request, res: Response) {
    try {
        const productId = req.params.id;
        let product = await ProductService.getById(+productId);
        if(!product) {
            return res.status(404).send({
                "message": "Product not found"
            })
        }
    
        const deleted = await ProductService.deleteProduct(+productId)
        return res.status(200).json({
            "message": "Product successfully deleted",
            "status": true,
            "Product": deleted
        })        
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            "message": "Error deleting product"
        })
    }
}

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

