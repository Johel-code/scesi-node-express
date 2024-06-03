import { ProductDTO } from '@dtos/ProductDTO'
import { prisma } from '@config/databaseConfig'

async function getAllProducts(
    brand?: string,
    stockover?: string, 
    stockbelow?: string,
    discountover?: string,
    discountbelow?: string,
    expireover?: string,
    expirebelow?: string
) {
    if ((stockover && stockbelow) || (discountover && discountbelow) || (expireover && expirebelow)) {
        throw new Error('Cannot filter by both "over" and "below" at the same time')
    }

    const stockOverNumber = stockover ? parseInt(stockover, 10) : undefined
    const stockBelowNumber = stockbelow ? parseInt(stockbelow, 10) : undefined
    const discountOverNumber = discountover ? parseInt(discountover, 10) : undefined
    const discountBelowNumber = discountbelow ? parseInt(discountbelow, 10) : undefined
    const expireOverDate = expireover ? new Date(expireover) : undefined
    const expireBelowDate = expirebelow ? new Date(expirebelow) : undefined

    const products = await prisma.product.findMany({
        where: {
            ...(brand && { brand }),
            ...(stockOverNumber !== undefined && { stock: { gte: stockOverNumber } }),
            ...(stockBelowNumber !== undefined && { stock: { lte: stockBelowNumber } }),
            ...(discountOverNumber !== undefined && { discount: { gte: discountOverNumber } }),
            ...(discountBelowNumber !== undefined && { discount: { lte: discountBelowNumber } }),
            ...(expireOverDate !== undefined && { expiration: { gte: expireOverDate } }),
            ...(expireBelowDate !== undefined && { expiration: { lte: expireBelowDate } }),
        }
    })

    return products
}

async function getById(id: number) {
    const product = await prisma.product.findUnique({
        where: { id }
    })
    return product
}

async function createProduct(data: ProductDTO) {
    const { name, brand, stock, batch, expiration, discount } = data
    const createProduct = await prisma.product.create({
        data: {
            name,
            brand,
            stock,
            batch,
            expiration: new Date(expiration),
            discount
        }
    })
    return createProduct
}

async function updateProduct(id: number, data: Partial<ProductDTO>) {
    const updateProduct = prisma.product.update({
        where: { id },
        data: {
            ...data,
            ...(data.expiration && { expiration: new Date(data.expiration)})
        }
    })
    return updateProduct
}

async function deleteProduct(id: number) {
    const deleteProduct = await prisma.product.delete({
        where: { id }
    })
    return deleteProduct
}

export default {
    getAllProducts,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}