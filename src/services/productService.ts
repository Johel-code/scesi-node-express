import { Product } from '@models/Product'
import products from '@assets/data.json';
let productsData = products


function getAllUsers(
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

    const stockOverNumber = stockover ? parseInt(stockover, 10) : null
    const stockBelowNumber = stockbelow ? parseInt(stockbelow, 10) : null
    const discountOverNumber = discountover ? parseInt(discountover, 10) : null
    const discountBelowNumber = discountbelow ? parseInt(discountbelow, 10) : null
    const expireOverDate = expireover ? new Date(expireover) : null
    const expireBelowDate = expirebelow ? new Date(expirebelow) : null

    return productsData
        .filter(product => !brand || product.brand === brand)
        .filter(product => !stockOverNumber || parseInt(product.stock, 10) >= stockOverNumber)
        .filter(product => !stockBelowNumber || parseInt(product.stock, 10) <= stockBelowNumber)
        .filter(product => !discountOverNumber || parseInt(product.discount, 10) >= discountOverNumber)
        .filter(product => !discountBelowNumber || parseInt(product.discount, 10) <= discountBelowNumber)
        .filter(product => !expireOverDate || new Date(product.expiration) >= expireOverDate)
        .filter(product => !expireBelowDate || new Date(product.expiration) <= expireBelowDate)
}

function getById(id: string) {
    const product = productsData.find(product => product.id === id)
    return product
}

function createProduct(data: Product) {
    data.id = productsData.length+1 + ""
    productsData.push(data);
    return productsData;
}

function updateProduct(id: string, data: Partial<Product>) {
    const productIndex = productsData.findIndex(product => product.id === id);

    productsData[productIndex] = {
        ...productsData[productIndex],
        ...data
    };

    return productsData[productIndex];

    // let updatedProduct

    // productsData = productsData.map(product => {
    //     if(product.id === id) {
    //         updatedProduct = { ...product, ...data }
    //         return updatedProduct
    //     }
    //     return product;
    // })

    // return updatedProduct;
}

function deleteProduct(id: string) {
    productsData = productsData.filter(product => product.id !== id)
    return productsData;
}

export default {
    getAllUsers,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}