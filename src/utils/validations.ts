import Joi from 'joi'
import { ProductDTO } from '@dtos/ProductDTO'

export const validateProductCreateData = (product: ProductDTO) => {

    const productCreateSchema = Joi.object<ProductDTO>({
        // id: Joi.number().required(),
        name: Joi.string().min(2).max(30).required(),
        brand: Joi.string(),
        stock: Joi.number(),
        batch: Joi.string(),
        expiration: Joi.date(),
        discount: Joi.number()
    })

    return productCreateSchema.validate(product)
}

export const validateProductUpdateData = (product: Partial<ProductDTO>) => {

    const productUpdateSchema = Joi.object<Partial<ProductDTO>> ({
        name: Joi.string().min(2).max(30),
        brand: Joi.string(),
        stock: Joi.number(),
        batch: Joi.string(),
        expiration: Joi.date(),
        discount: Joi.number()
    })

    return productUpdateSchema.validate(product)
}