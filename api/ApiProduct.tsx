import {sendGet} from "./axios";


export interface IProductItem {
    id: number,
    price: number,
    description: string,
    category: string,
    tag: "Juice" | "Food",
    long_description: string,
    weight: string,
    size: string,
    image: string[],
}

const path = {
    getAllProduct: '/DGetAllProduct',
    getProductID: '/DProduct'
}

export function getProductList (params: any) : Promise<any> {
    return sendGet(path.getAllProduct,)
}

export function getProductID (params: any) : Promise<IProductItem> {
    return sendGet(path.getProductID + '/?id=' + params.id)
}