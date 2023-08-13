import ApiUser from "./ApiUser";
import { sendGet, sendPost } from "./axios";


export interface IProductItem {
    total_pages: string,
    total_products: string,
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
    iduser: number,
    idproduct: number,
    quantity: number,
    note: string
}

const path = {
    getAllProduct: '/DGetAllProduct?page=',
    getAllProductByTag: '/DProduct?tag=',
    getProductID: '/DProduct?id=',
    getComment: '/DRate?id=',
    getHighRateProduct: '/',
    addToCart : '/DCart?action=add',
    deleteProduct: '/DDelete.php'
}

export function getProductList(params: any): Promise<any> {
    return sendGet(path.getAllProductByTag + params.tag + '&page='+ params.indexPage)
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

export function getAllProduct(params): Promise<IProductItem> {
    return sendGet(path.getAllProduct+params)
}

export function addProductToCart(params :IAddProductToCart): Promise<any> {
    return sendPost(path.addToCart, params, {
        Authorization : ApiUser.getAuthToken()
    })
}

export function deleteProduct(params: string) : Promise<any> {
    return sendPost(path.deleteProduct, params, {
        Authorization : ApiUser.getAuthToken()
    })
}