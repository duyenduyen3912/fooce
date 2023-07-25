import React from 'react'
import classNames from 'classnames/bind'
import style from './Product.module.scss'
import Image from 'next/image'
import 'animate.css'
import { Button, Col, Rate } from 'antd'
import { DollarOutlined } from '@ant-design/icons'

const cx = classNames.bind(style)
export default function Product(props) {
  return (
    <Col span = {props.col} className="gutter-row" xs={24}  sm={12} md= {8} lg={props.col}>
        <div className={cx("product")}>
            <div className={cx("img-wrap")}>
            <Image src={require(`../../assets/imgs/${props.name}.png`)} alt="juice" className={cx("img")}/>
            <div className={cx("product-btn")}>

            <Button  type='primary' className={`animate__animated animate__bounceIn ${cx("order-btn")}`}  >add to cart</Button>
            </div>
        </div>
        <div className={cx("product-name")}>Healthy time</div>
        <div className={cx("product-star")}>
        <Rate disabled defaultValue={5} style={{  color: '#fbbcc0', fontSize: '15px'}}/>
        </div>
        <div className={cx("product-price")}>
            <DollarOutlined style={{ fontSize: '15px', color: '#5a5a5a', fontWeight: '500' }}/>
            <span className={cx("price")}>12.00</span>
        </div>
        </div>
        
    </Col>
  )
}
