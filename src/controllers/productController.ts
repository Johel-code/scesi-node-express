import { Request, Response } from 'express';
import ProductService from '@services/productService';

function getProducts (req: Request, res: Response) {
    const products = ProductService.getAllUsers();
    return res.json(products);
}

function getProductById (req: Request, res: Response) {
    const productId = req.params.id
    // const id = parseInt(productId)
    const product = ProductService.getById(productId)
    if(!product) {
        return res.status(404).send({
            "message": "Producto no encontrado"
        })
    }
    return res.json(product)
}

function createProduct (req: Request, res: Response) {
    const data = req.body;
    //todo validar
    const product = ProductService.createProduct(data)
    return res.status(201).json(product);
}

function updateProduct (req: Request, res: Response) {
    const productId = req.params.id;
    let product = ProductService.getById(productId);
    if(!product) {
        return res.status(404).send({
            "message": "Producto no encontrado"
        })
    }

    const data = req.body;
    //todo validar
    product = ProductService.updateProduct(productId, data);
    return res.send(product)
}

function deleteProduct (req: Request, res: Response) {
    const productId = req.params.id;
    let product = ProductService.getById(productId);
    if(!product) {
        return res.status(404).send({
            "message": "Producto no encontrado"
        })
    }

    const deleted = ProductService.deleteProduct(productId)
    return res.status(200).json(deleted)
}

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

