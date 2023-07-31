import React from 'react'
import style from "./TotalMoney.module.scss"
import classNames from 'classnames/bind'
import { Col } from 'antd'

const cx = classNames.bind(style)
export default function TotalMoney(props) {
  return (
    <>
        <Col span={6} className='gutter-row'>
            <div className={cx('total-money')}>
                <div className={cx('header')}>
                    {props.name}
                </div>
                <div className={cx('money')}>
                    {props.totalMoney} VNĐ
                </div>

            </div>
        </Col>
        
    </>
  )
}
