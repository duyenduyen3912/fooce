import { Carousel, Col, Row } from "antd";
import classNames from "classnames/bind";
import style from "./Home.module.scss"
import 'animate.css'
import Image from "next/image"
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Product from "../../components/product";
import MenuType from "../../components/Menu";
import image from "../../constant/img/image";
import { useQuery } from "react-query";
import { getAllProduct, getProductInCart, getProductList } from "../../api/ApiProduct";
import Loading from "../../components/loading";
import ApiUser from "../../api/ApiUser";

const cx = classNames.bind(style)  

function Homepage() {
    const inView = true;
    const [juice, setJuice] = useState([])
    const [food, setFood] = useState([])
    const {data: juiceData} = useQuery([`JuiceList`], () => getProductList({
        tag: "Juice",
        indexPage: "1"
      }));
    const {data: foodData} = useQuery([`FoodList`], () => getProductList({
        tag: "Food",
        indexPage: "1"
    }));
    useEffect(()=>{
        if(juiceData?.data.status === "success" || foodData?.data.status === "success")
            setJuice(juiceData)
            setFood(foodData)
    },[juiceData,foodData])
    console.log(juiceData)
    console.log(foodData)
    return (
       
       <div className={cx("homepage")}>
        <div className={cx("carousel-wrap")}>
            
            <div className={cx("carousel")} >
                <Carousel autoplay dotPosition="right" waitForAnimate={true}>
                    <div className={cx("item_wrap")} >
                            <Image src={require("../../assets/imgs/2.png")} alt="drink"  className={cx("image-carousel")} />
                           
                        
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/3.png")} alt="drink" className={cx("image-carousel")}/>
                        
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/4.png")} alt="drink" className={cx("image-carousel")}/>
                        
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/5.png")} alt="food" className={cx("image-carousel")}/>
                       
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/6.png")} alt="food" className={cx("image-carousel")}/>
                       
                    </div>
                   
                </Carousel>
            </div>
           
        </div>
        <div className={cx("hight-rate-menu")}>
            <div className={cx("juice")}>
                <div className={cx("logo-wrap")}>
                <Image src={(require("../../assets/imgs/logo.png"))} alt="border" className={cx("logo")}/>

                </div>
                <div className={cx("title-wrap")}>
                    <div className={cx("title")}>
                    Smoothies & Juices
                    </div>
                </div>
                <div className={cx("product-wrap")}>
                <Row gutter={16}>
                    {juiceData?.status === "success" ? 
                        juiceData?.data.map((item,index) => {
                                return (
                                    <Product 
                                        key={item.id}
                                        col={6}
                                        name={item.name} 
                                        image = {item.image}
                                        id = {item.id}
                                        star = {item.Star}
                                        price = {item.price}
                                    />
                                )
                            }
                            
                        )
                        : null
                    }
                </Row>
                </div>
            </div>
            <div className={cx("food")}>
            <div className={cx("logo-wrap")}>
                <Image src={(require("../../assets/imgs/logo.png"))} alt="border" className={cx("logo")}/>

                </div>
                <div className={cx("title-wrap")}>
                    <div className={cx("title")}>
                    Foods & Pizza
                    </div>
                </div>
                <div className={cx("product-wrap")}>
                <Row gutter={16}>
                    {foodData?.status === "success" ? 
                        foodData?.data.map((item,index) => {
                                return (
                                    <Product 
                                        key={item.id}
                                        col={6}
                                        name={item.name} 
                                        image = {item.image}
                                        id = {item.id}
                                        star = {item.Star}
                                        price = {item.price}
                                    />
                                )
                            }
                            
                        )
                        : null
                    }
                </Row>
                </div>
            </div>
          
        </div>
        <div className={cx("favourite-menu")}>
            <MenuType bg={image.menuBg} menuType="Favourite"/>
            <Image src={require("../../assets/imgs/pink-straw.png")} alt="pink-straw" className={cx("pink-straw")}/>
            <Image src={require("../../assets/imgs/blueberry.png")} alt="pink-straw" className={cx("blueberry")}/>
        </div>
           
       </div>
       
     )
}

export default Homepage;