import { sendGet } from "./axios";


export interface IProductItem {
    data: [{
        Star: number,
        category: string,
        description: string,
        id: number,
        image: string,
        long_description: string,
        name: string,
        price: string,
        size: string,
        tag: "Juice" | "Food",
        weight: string
    }]

}

export interface IComment {
    status: string,
    data: [{
        Star: number,
        Comment: string,
    }]
}

export interface IAddProductToCart {
    idUser: number,
    idproduct: number,
    quantity: number,
    note: string
}

const path = {
    getAllProduct: '/DGetAllProduct',
    getAllProductByTag: '/DProduct?tag=',
    getProductID: '/DProduct?id=',
    getComment: '/DRate?id=',
    getHighRateProduct: '/',
    addToCart : 'DCart?action=add'
}

export function getProductList(params: any): Promise<any> {
    return sendGet(path.getAllProductByTag + params)
}

export function getProductID(params: string): Promise<IProductItem> {
    return sendGet(path.getProductID + params)
}

export function getComment(params: string): Promise<IComment> {
    return sendGet(path.getComment + params)
}

export function getHighRateProduct(params: string): Promise<IProductItem> {
    return sendGet(path.getHighRateProduct + params)
}

export function getAllProduct(): Promise<IProductItem> {
    return sendGet(path.getAllProduct)
}

export function addProductToCart(): Promise<IAddProductToCart> {
    return sendGet(path.addToCart)
}