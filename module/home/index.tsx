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
import { getAllProduct } from "../../api/ApiProduct";
import Loading from "../../components/loading";

const cx = classNames.bind(style)  
// const juice  = [];
// const food = [];
function Homepage() {
    const inView = true;
    const [juice, setJuice] = useState([])
    const [food, setFood] = useState([])
    const { isLoading, data } = useQuery(['getAllProduct' ], getAllProduct )
   
    useEffect(()=>{
        data?.data.map((item, index) => {
            
            if(item.tag.includes("Juice")) {
                setJuice((prev) => [...prev, item])
                
            } else if(item.tag.includes("Food")){
                setFood((prev) => [...prev, item])
            }
        })
    },[data])
  
    return (
       
       <div className={cx("homepage")}>
        <div className={cx("carousel-wrap")}>
            <div className={cx("border-top")}>
                <Image src={(require("../../assets/imgs/border-top.png"))} alt="border"/>
            </div>
            <div className={cx("carousel")} >
                <Carousel autoplay dotPosition="right" waitForAnimate={true}>
                    <div className={cx("item_wrap")} >
                            <Image src={require("../../assets/imgs/2.png")} alt="drink"  className={cx("image-carousel")} />
                            <div className={cx("text") } >
                                <div className={cx("block-1", "image-text")}>
                                    <Image src={require("../../assets/imgs/drink-smoothie.png")} alt="drink-smoothie" className={` ${inView ? 'animate__animated animate__fadeInRightBig' : ''}`} />
                                </div>
                                <div className={cx("block-1", "image-text")}>
                                    <Image src={require("../../assets/imgs/shine.png")} alt="shine" className={` ${inView ? 'animate__animated animate__zoomIn' : ''}`} />
                                </div>
                            </div>
                        
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/3.png")} alt="drink" className={cx("image-carousel")}/>
                        <div className={cx("text") } >
                                <div className={cx("block-2", "image-text")}>
                                    <Image src={require("../../assets/imgs/raw-fresh.png")} alt="raw-fresh" className={` ${inView ? 'animate__animated animate__fadeInUp' : ''}`} />
                                </div>
                                <div className={cx("block-2", "image-text")}>
                                    <Image src={require("../../assets/imgs/lemon.png")} alt="lemon" className={` ${inView ? 'animate__animated animate__fadeInLeft' : ''}`} />
                                </div>
                                <div className={cx("block-2", "image-text", "lemon-leaf")}>
                                    <Image src={require("../../assets/imgs/lemon-leaf.png")} alt="lemon-leaf" className={` ${inView ? 'animate__animated animate__zoomIn' : ''}`} />
                                </div>
                                <div className={cx("block-2", "image-text", "lemon-leaf")}>
                                    <Image src={require("../../assets/imgs/lemon-leaf2.png")} alt="lemon-leaf" className={` ${inView ? 'animate__animated animate__zoomIn' : ''}`} />
                                </div>
                        </div>
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/4.png")} alt="drink" className={cx("image-carousel")}/>
                        <div className={cx("text") } >
                                <div className={cx("block-3", "image-text")}>
                                    <Image src={require("../../assets/imgs/fresh.png")} alt="fresh-text" className={` ${inView ? 'animate__animated animate__fadeInRightBig' : ''}`} />
                                </div>
                                <div className={cx("block-3", "image-text")}>
                                    <Image src={require("../../assets/imgs/detox.png")} alt="detox-text" className={` ${inView ? 'animate__animated animate__fadeInLeftBig' : ''}`} />
                                </div>
                                <div className={cx("block-3", "image-text")}>
                                    <Image src={require("../../assets/imgs/straw.png")} alt="straw" className={` ${inView ? 'animate__animated animate__fadeInDown' : ''}`} />
                                </div>
                                <div className={cx("block-3", "image-text")}>
                                    <Image src={require("../../assets/imgs/melon-seed.png")} alt="seed" className={` ${inView ? 'animate__animated animate__fadeInDown' : ''}`} />
                                </div>
                        </div>
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/5.png")} alt="food" className={cx("image-carousel")}/>
                        <div className={cx("text") } >
                                <div className={cx("block-4", "image-text")}>
                                    <Image src={require("../../assets/imgs/traditional.png")} alt="traditional" className={` ${inView ? 'animate__animated animate__rollIn' : ''}`} />
                                </div>
                                <div className={cx("block-4", "image-text")}>
                                    <Image src={require("../../assets/imgs/food.png")} alt="food" className={` ${inView ? 'animate__animated animate__rollIn' : ''}`} />
                                </div>
                               
                        </div>
                    </div>
                    <div className={cx("item_wrap")}>
                        <Image src={require("../../assets/imgs/6.png")} alt="food" className={cx("image-carousel")}/>
                        <div className={cx("text") } >
                                <div className={cx("block-5", "image-text")}>
                                    <Image src={require("../../assets/imgs/pizza-party.png")} alt="pizza-party" className={` ${inView ? 'animate__animated animate__rollIn' : ''}`} />
                                </div>
                               
                               
                        </div>
                    </div>
                   
                </Carousel>
            </div>
            <div className={cx("border-bottom")}>
                <Image src={(require("../../assets/imgs/border-bottom.png"))} alt="border"/>
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
                    {
                        juice.map((item,index) => {
                            
                            if(index <= 11) {

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
                            
                        })
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
                    {
                        food.map((item,index) => {
                            if(index <= 11) {
                                return (
                                    <Product 
                                        col={6}
                                        name={item.name} 
                                        image = {item.image}
                                        id = {item.id}
                                        star = {item.Star}
                                        price = {item.price}
                                    />
                                )
                            }  
                        })
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