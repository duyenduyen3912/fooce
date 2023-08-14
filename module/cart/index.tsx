import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/PageTitle'
import classNames from 'classnames/bind'
import style from "./Cart.module.scss"
import { Button, Image, InputNumber, message, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { CloseOutlined, DollarOutlined } from '@ant-design/icons'
import ButtonCustom from '../../components/Button'
import Head from 'next/head'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ApiUser from '../../api/ApiUser'
import { deleteProductInCart, getProductInCart, updateProductInCart } from '../../api/ApiProduct'
import { formatCurrency } from '../../constant/currencyFormatter'
import Link from 'next/link'



const cx = classNames.bind(style)

interface DataType {
    key: string;
    product: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    
}





export default function Cart() {
    const queryClient = useQueryClient();
    const [cartList, setCartList] = useState([])
    const [subtotal,setSubtotal] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const { data : cart, refetch} = useQuery(['cart', ApiUser.getIdUser()], () => getProductInCart({iduser: ApiUser.getIdUser() }),
    {
        enabled: ApiUser.getIdUser() !== null
    }
    );
    const deleteMutation = useMutation(
        async (payload: any) => await deleteProductInCart(payload),
        {
          onSuccess: async (data: any) => {
            console.log(data)
            if(data.status === "success") {
                message.success("Delete product successfully")
            } else {
                message.error("Something went wrong, please try again!")
            }
            refetch()
          }
        }
    )
    const updateMutation = useMutation(
        async (payload: any) => await updateProductInCart(payload),
        {
          onSuccess: async (data: any) => {
            console.log(data)
            
          }
        }
    )
    const confirm = (id) =>{
        deleteMutation.mutate({
            iduser: ApiUser.getIdUser().toString(),
            idproduct: id
        })

    }
    
    const handleChangeQuantity = (id,value) => {
        setQuantity(value)
        updateMutation.mutate({
            idproduct: id,
            iduser: ApiUser.getIdUser(),
            quantity: value,
            note: ''
        })
        refetch()
    }

    const handleCheckout = () => {
       queryClient.setQueryData('subtotal', subtotal)
    }

    useEffect(()=> {
        const newCartData = cart?.data.map((item) => {
            const serverImage = item.image.split(";")

            return (
                {
                    key: item.idproduct,
                    product: serverImage[0],
                    name: item.name,
                    price: item.price,
                    quantity: item.total_quantity,
                    subtotal: item.total_price
                }
            )
        })
        const subtotal = cart?.data.reduce((sum,item)=>{
            return sum + parseInt(item.total_quantity,10) * parseInt(item.price,10)
        } ,0)
        setSubtotal(subtotal)
        setCartList(newCartData)
        refetch()
    }, [cart])
    console.log(subtotal)
    const columns: ColumnsType<DataType> = [
        {
            title: ' ',
            dataIndex: 'delete',
            key: 'delete',
            width: 50,
            
            render: (_, record) => {
                return (
                    <>
                        <Popconfirm
                            title="Confirm"
                            description="Do you want to remove this product"
                            onConfirm={()=> confirm(record.key)}
                            onOpenChange={() => console.log(record.key)}
                        >
                            <CloseOutlined />
                        </Popconfirm>
                    </>
                )
            }
            
        },
        {
            title: ' ',
            dataIndex: 'product',
            key: 'product',
            align: "center",
            width: 86,
            fixed: "left",
            render: (_, record) => {
                return (
                    <div className={cx("img-wrap")}>
    
                        <Image 
                        
                        src={record.product}
                        fallback={require("../../assets/imgs/logo.png")}
                        
                        />
                    </div>
                )
            }
        },
        {
            title: 'product',
            dataIndex: 'name',
            key: 'name',
            width: 400,
           
            render: (_, record) => {
                return (
                    <>
                        <Link href={`/product/${record.key}`}>
                        
                        <span className={cx("product-name")}>{record.name}</span>
                        </Link>
                    </>
                )
            }
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
            width: 130,
            render: (_, record) => {
                return (
                    <>
                        <DollarOutlined style={{fontSize: '15px'}}/>
                        <span className={cx("product-price")}>{formatCurrency(record.price)}</span>
                    </>
                )
            }
        },
        {
            title: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 260,
            render: (_, record) => {
                return (
                    <>
                        <InputNumber 
                            size='large' 
                            min={1} max={100} 
                            defaultValue={record.quantity} 
                            onChange={(value) => handleChangeQuantity(record.key, value)}
                            className={cx("product-quantity")}/>
                    </>
                )
            }
        },
        {
            title: 'subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
            width: 180,
            render: (_, record) => {
                return (
                    <>
                        <DollarOutlined style={{fontSize: '15px'}}/>
                        <span className={cx("product-price")}>{formatCurrency(record.price* record.quantity)}</span>
                    </>
                )
            }
        }
    ]
    console.log(subtotal)
  return (
    <>
         <Head >
            <title>Fooce | Cart</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <PageTitle name="Cart" />
        <div className={cx("cart")}>
            <Table columns={columns} dataSource={cartList} className={cx("cart-table")}/>
            <div style={{textAlign: 'center'}}>
                <Link href={'/checkout'}>
                    <Button className='btn' onClick={handleCheckout}>proceed to checkout</Button>
                </Link>
                
            </div>
            
        </div>
    </>
  )
}
