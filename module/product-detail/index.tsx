import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Col, Collapse, InputNumber, message, Rate, Row, Button } from 'antd';
import { Image as ImageAnt } from 'antd'
import style from "./ProductDetail.module.scss"
import classNames from 'classnames/bind';

import { DollarCircleOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Product from '../../components/product';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addProductToCart, getComment, getProductID, IAddProductToCart } from '../../api/ApiProduct';
import { formatCurrency } from '../../constant/currencyFormatter';
import ApiUser from '../../api/ApiUser';

const cx = classNames.bind(style)
export default function ProductDetail(props) {
    const [quantity,setQuantity] = useState(1)
    const queryClient = useQueryClient()
    const cart = queryClient.getQueryData(['cart', ApiUser.getIdUser()])
    const { isLoading, isError, isFetching, data, error } = useQuery(['product', props.id], () => getProductID(`${props.id}`),
        {
            enabled: props.id != undefined
        }
    );
    const { data: data_cmt } = useQuery(['comment', props.id], () => getComment(`${props.id}`),
        {
            enabled: props.id != undefined,
            
        }
    );
    const addProductMutation = useMutation (
        async (payload : IAddProductToCart) =>  await addProductToCart (payload), 
        {
          onError: () => {
           
          },
          onSettled: async (data:any) => {
            if(data.status === "success") {
              console.log(data)
               message.success('added to cart')
               queryClient.refetchQueries(['cart', ApiUser.getIdUser()])
              
             } else {
                message.error('something went wrong, please try again')
             }
          }
        }
      )
      
    const severImages: string[] = data?.data[0].image.split(";")
    const image: string[] = severImages || [];
    const onHandleAddtocart = () => {
        addProductMutation.mutate({
          iduser: ApiUser.getIdUser(),
          idproduct : props.id,
          quantity : quantity,
          note: ''
    })}
 
    return (
        <>
            <Head >
                <title>Fooce | {data?.data[0].name}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/icon.png" />
            </Head>
            <Row justify={"center"} className={cx("product-detail")} gutter={80} >
                <Col span={8} className="gutter-row">
                    <div className={cx("product-gallery")}>

                        <div className={cx("product-img-wrap")}>
                            <ImageAnt src={image.length != 0 ? severImages[0] : ''} alt="product-img" className={cx("img-origin")} preview={false} />
                        </div>
                    
                            <ImageAnt.PreviewGroup >
                                <Row gutter={8} className={cx("img-group")}>
                                {severImages?.map((imageUrl, index) => {
                                 
                                    if (index != 0 && imageUrl != '') {
                                        return (
                                            <Col className={`gutter-row ${cx("img-group-wrap")}`} span={8}>
                                                <ImageAnt
                                                    key={index}
                                                    src={imageUrl}
                                                    width={'100%'}
                                                    className={cx("img-thumbnail")}
                                                    style={{ overflow: "hidden" }}
                                                />
                                            </Col>
                                        )
                                    }
                                })}
                                </Row>
                            </ImageAnt.PreviewGroup>
                        

                    </div>


                </Col>
                <Col span={8} className="gutter-row">
                    <div className={cx("product-name")}>
                        {data?.data[0].name}
                    </div>
                    <div className={cx("product-price")}>
                        <DollarCircleOutlined style={{ fontSize: "14px", color: "#5a5a5a", transform: "translateY(100%)" }} />
                        <span className={cx("price")}>{formatCurrency(parseInt(data?.data[0].price, 10))}</span>

                    </div>
                    <div className={cx("product-rate")}>
                        <Rate allowHalf disabled value={Math.round( data?.data[0].Star * 2) / 2} style={{ color: "#FBBCC0", fontSize: "12px" }} />
                        <span className={cx("number-rate")}>( {data_cmt?.status.includes('success') ? data_cmt?.data.length : 0} {" "} customer review)</span>
                    </div>
                    <div className={cx("product-intro")}>
                        {data?.data[0].description}
                    </div>
                    <div className={cx("product-order")}>
                        <InputNumber 
                            onChange={(value)=> setQuantity(value)}
                            min={1} max={10} 
                            defaultValue={1}
                            className={cx("input-number")} />
                        <Button onClick={onHandleAddtocart} className={cx("order-btn")}>add to cart</Button>
                    </div>
                    <div className={cx("product-infor")}>
                        <div className={cx("infor-wrap")}>
                            <span className={cx("infor-title")}>SKU:</span>
                            <span className={cx("infor-text")}>005</span>
                        </div>
                        <div className={cx("infor-wrap")}>
                            <span className={cx("infor-title")}>Category:</span>
                            <span className={cx("infor-text")}>{data?.data[0].category}</span>
                        </div>
                        <div className={cx("infor-wrap")}>
                            <span className={cx("infor-title")}>Tags:</span>
                            <span className={cx("infor-text")}>{data?.data[0].tag}</span>
                        </div>
                    </div>
                    <div >
                        <Collapse expandIcon={customExpandIcon} className={cx("product-description")}>
                            <Collapse.Panel header={<CustomHeader>Description</CustomHeader>} key="1" className={cx("description")}>
                                <div className={cx("infor-wrap")}>
                                    <div className={cx("infor-text")}>
                                        {data?.data[0].long_description}
                                    </div>
                                </div>
                            </Collapse.Panel>
                            <Collapse.Panel header={<CustomHeader>Additional information</CustomHeader>} key="2" className={cx("description")}>
                                <div className={cx("infor-wrap")}>
                                    <span className={cx("infor-title")}>Weight:</span>
                                    <span className={cx("infor-text")}>	{data?.data[0].weight}</span>
                                </div>
                                <div className={cx("infor-wrap")}>
                                    <span className={cx("infor-title")}>Dimensions:</span>
                                    <span className={cx("infor-text")}>{data?.data[0].size}</span>
                                </div>
                            </Collapse.Panel>
                            <Collapse.Panel header={<CustomHeader>Reviews</CustomHeader>} key="3" className={cx("description")}>
                                <div className={cx("review-wrap")}>
                                    <div className={cx("review-title")}> 
                                    {data_cmt?.status.includes('success') ? data_cmt?.data.length : 0} {" "}
                                    review for {data?.data[0].name}
                                    </div>
                                    {
                                        data_cmt?.status.includes('success') ? 
                                        data_cmt?.data.map((item, index) => {
                                            return (
                                                <div className={cx("review")} key={index}>
                                                    <div className={cx("review-img-wrap")}>
                                                        <ImageAnt src={require("../../assets/imgs/jisoo.jpg").default.src} alt="reviewer" className={cx("reviewer-img")} preview={false} />
                                                    </div>
                                                    <div className={cx("review-content")}>

                                                        <Rate allowHalf disabled value={Math.round(item.Star * 2) / 2} className={cx("review-star")} style={{ color: "#FBBCC0", fontSize: "13px" }} />
                                                        <div className={cx("review-name")}>Smoothie lover</div>
                                                        <div className={cx("review-text")}>
                                                            {item.Comment}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : ''
                                    }
                                    
                                </div>
                                <div className={cx("your-review")}>
                                    <div className={cx("your-review-title")}>Add a review</div>
                                    <div className={cx("your-review-title")}>Your Rating</div>
                                    <Rate style={{ color: "#FBBCC0", fontSize: "13px" }} />
                                    <div className={cx("your-review-title")}>Your Review</div>
                                    <textarea className={cx("your-review-input")} />
                                    <Button className={cx("order-btn")}>submit</Button>
                                </div>
                            </Collapse.Panel>
                        </Collapse>
                    </div>
                </Col>
            </Row>
           
        </>
    )
}

const CustomHeader = ({ children }) => {
    return (
        <span className={cx("descripttion-title")}>
            {children}
        </span>
    )
}

const customExpandIcon = (panelProps) => {
    const { isActive } = panelProps;
    return isActive ? <MinusOutlined /> : <PlusOutlined />;
};

