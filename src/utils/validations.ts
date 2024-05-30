import Joi from 'joi'
import { Product } from '@models/Product'

export const validateProductCreateData = (product: Product) => {

    const productCreateSchema = Joi.object<Product>({
        id: Joi.string().required(),
        name: Joi.string().min(2).max(30).required(),
        brand: Joi.string(),
        stock: Joi.string(),
        batch: Joi.string(),
        expiration: Joi.string().min(5).max(10),
        discount: Joi.string()
    })

    return productCreateSchema.validate(product)
}

export const validateProductUpdateData = (product: Partial<Product>) => {

    const productUpdateSchema = Joi.object<Partial<Product>> ({
        name: Joi.string().min(2).max(30),
        brand: Joi.string(),
        stock: Joi.string(),
        batch: Joi.string(),
        expiration: Joi.string().min(5).max(10),
        discount: Joi.string()
    })

    return productUpdateSchema.validate(product)
}