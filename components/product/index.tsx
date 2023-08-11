import React, { useState } from 'react'
import classNames from 'classnames/bind'
import style from './Product.module.scss'
// import Image from 'next/image'
import 'animate.css'
import { Button, Col, Rate, Image } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { formatCurrency } from '../../constant/currencyFormatter'
import { useMutation } from 'react-query'
import { addProductToCart, IAddProductToCart } from '../../api/ApiProduct'
import ApiUser from '../../api/ApiUser'
const cx = classNames.bind(style)
export default function Product(props) {
  const imageList: string[] = props.image?.split(";")
  const image: string[] = imageList || [];
  const addProductMutation = useMutation (
    async (payload : IAddProductToCart) =>  await addProductToCart (payload), 
    {
      onSuccess: async (data: any) => {
        try {
           console.log(data)
        } catch (error) {
          console.error("Error in onSuccess:", error);
          
        }
      },
      onError: () => {
       
      },
    }
  )
  const onHandleAddtocart = () => {
        addProductMutation.mutate({
          idUser: ApiUser.getIdUser(),
          idproduct : props.id,
          quantity : 1,
          note: ''
})
  }
  return (
    <Col span={props.col ? props.col : 6} className="gutter-row" xs={24} sm={24} md={24} lg={props.col}>
      <div className={cx("product")}>
        <div className={cx("img-wrap")}>
          <Image src={image.length != 0 ? imageList[0] : ''} alt="juice" className={cx("img")} preview={false} />
          <div className={cx("product-btn")}>

            <Button 
              type='primary' 
              className='animate__animated animate__bounceIn btn'
              onClick={onHandleAddtocart}  
              >add to cart</Button>
          </div>
        </div>
        <Link href={`/product/${props.id}`}>
          <div className={cx("product-name")}>{props.name}</div>
        </Link>

        <div className={cx("product-star")}>
          <Rate allowHalf disabled value={Math.round(props.star * 2) / 2} style={{ color: '#fbbcc0', fontSize: '15px' }} />
        </div>
        <div className={cx("product-price")}>
          <DollarOutlined style={{ fontSize: '15px', color: '#5a5a5a', fontWeight: '500' }} />
          <span className={cx("price")}>{props.price ? formatCurrency(props.price) : ''}</span>
        </div>
      </div>

    </Col>
  )
}
