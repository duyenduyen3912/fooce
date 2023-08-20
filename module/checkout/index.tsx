import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import style from './Checkout.module.scss'
import classNames from 'classnames/bind'
import PageTitle from '../../components/PageTitle'
import {Button, Col, Form, Input, message, Row, Select, Space } from 'antd'
import ButtonCustom from '../../components/Button'
import formRules from '../../constant/formRules'
import axios from 'axios'
import { DollarOutlined } from '@ant-design/icons'
import { formatCurrency } from '../../constant/currencyFormatter'
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { deleteProductInCart, order } from '../../api/ApiProduct'
import ApiUser from '../../api/ApiUser'


const cx = classNames.bind(style)
export default function Checkout() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [data, setData] = useState([]);
  const [subtotal,setSubtotal] = useState(queryClient.getQueryData('subtotal') || 0)
  const [shipPrice, setShipPrice] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cart,setCart] = useState(queryClient.getQueryData(['cart', ApiUser.getIdUser()]) || {data : []})
  const districtData = data.map((item) => {
    return item.name;
  })

  const wardData = data.reduce((acc, item, index) => {
    acc[item.name] = item.wards.map((ward) => ward.name);
    return acc;
  }, {});

  type WardName = keyof typeof wardData;

  const [wards, setWards] = useState(wardData[districtData[0] as WardName]);
  const [secondWard, setSecondWard] = useState(wardData[districtData[0] as WardName]);
  const deleteMutation = useMutation(
    async (payload: any) => await deleteProductInCart(payload),
    {
      onSuccess: async (data: any) => {
        
      }
    }
)
  const orderMutation = useMutation(
    async (payload:any) => await order(payload), {
      onSettled: async (data: any) => {
        console.log(data)
        if(data.status === "success") {
          await cart.data.map((item)=> {
            deleteMutation.mutate({
                iduser: ApiUser.getIdUser().toString(),
                idproduct: item.idproduct
            })
          })  
        message.success("Your order is successfully", 3)
        setTimeout(()=> {
              window.location.replace("/cart")
          }, 3)
        } else {
          message.error("Something went wrong, please try again", 3)
          setTimeout(()=> {
              router.push("/cart")
          }, 3)
        }
      }
    }
  )
  console.log(cart)
  const handleProvinceChange = (value: WardName) => {
    setWards(wardData[value]);
    setSecondWard(wardData[value][0]);
    if(value.toString().includes("Quận")){
       setShipPrice(15000)
    } else {
      setShipPrice(30000)
    }

   
  };

  const onSecondCityChange = (value: WardName) => {
    setSecondWard(value);
  };
  

  const onFinish = () => {
    orderMutation.mutate({
      iduser: ApiUser.getIdUser(),
      idproduct: queryClient.getQueryData('product-order'),
      phone: phoneNumber,
      address: `${secondWard}, ${wards}, TP. Hà Nội`,
      totalmoney: subtotal+shipPrice
    })
    };
    
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    const onChange = (value: string[]) => {
      console.log(value)
    }

    useEffect(()=>{
      axios.get("https://provinces.open-api.vn/api/?depth=3").then((response) => response.data[0].districts)
      .then((districts) => {
        setData(districts); 
      })
      .catch((error) => {
        console.error('Error fetching districts: ', error);
      });
      if(subtotal === 0) {
        message.info('Checkout time out, please return to cart page', 5)
        setTimeout(()=>{
          router.push("/cart");
      }, 5000)
      }
    },[subtotal])  
      
  return (
    <>
        <Head >
            <title>Fooce | Checkout</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <PageTitle name="Checkout" />
        <div className={cx("checkout")}>
                <div className={cx("checkout-title")}>Billing details</div>
                <Row className={cx("checkout-form")} justify='space-between' gutter={80}>
                  <Col span={8} className={`gutter-row ${cx("cart-total")}`} >
                   
                    <div className={cx("total-item")}>
                            <div className={cx("total-title")}>Subtotal</div>
                            <div className={cx("total-infor")}>
                                <DollarOutlined style={{fontSize: "15px", color: "#9c9c9c", marginRight: "4px"}} />
                                {formatCurrency(subtotal)}
                            </div>
                    </div>
                    <div className={cx("total-item")}>
                            <div className={cx("total-title")}>Shipping	</div>
                            <div className={cx("total-infor")}>	
                                <div >
                                    Flat rate: { " "}
                                    <DollarOutlined style={{fontSize: "15px", color: "#9c9c9c", marginRight: "4px"}} />
                                    {formatCurrency(shipPrice)}
                                </div>
                                
                        
                               
                            </div>
                    </div>
                    <div className={cx("total-item")}>
                            <div className={cx("total-title")}>Total</div>
                            <div className={cx("total-infor")}>
                                <DollarOutlined style={{fontSize: "15px", color: "#9c9c9c", marginRight: "4px"}} />
                                {formatCurrency(subtotal+shipPrice)}
                            </div>
                    </div>
                        
                        
                  </Col>
                  <Col span={10} className='gutter-row'>
                    <Form
                        name="basic"
                        layout= "vertical"
                      
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                      
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className={cx("form")}
                    >
                       
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={formRules.phoneRules}
                            className={cx("form-label")}
                            wrapperCol={{ span: 24 }}
                        >
                        <Input onChange={(e)=> setPhoneNumber(e.target.value)} className={cx("form-input")}/>
                        </Form.Item>
                        <br />
                        <Form.Item
                            label="Address (Ha Noi city only)"
                        
                            rules={[{ required: true, message: 'Please input your address!' }]}
                            className={cx("form-label")}
                            wrapperCol={{ span: 24 }}
                        >
                          <Space 
                          className={cx("form-space")}
                          wrap>
                              <Select
                                defaultValue={districtData[0]}
                                style={{ minWidth: 200 }}
                                onChange={handleProvinceChange}
                                options={districtData.map((province) => ({ label: province, value: province }))}
                                
                              />
                              <Select
                              
                                style={{ minWidth: 200 }}
                                value={secondWard}
                                onChange={onSecondCityChange}
                                options={wards ? wards.map((ward) => ({ label: ward, value: ward })) : []}
                              />
                            </Space>
                        </Form.Item>
                        
                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button className={cx('btn')} htmlType='submit'>order</Button>
                        </Form.Item>
                    </Form>
                  </Col>
                  
                </Row>
                
        </div>
    </>
    
  )
}
